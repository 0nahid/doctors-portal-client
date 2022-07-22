import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CheckoutForm({ id, price, userName, email }) {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    useEffect(() => {
        axios.post(`http://localhost:5500/create-payment-intent`, {
            price: price
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        }).then(res => {
            if (res.data?.clientSecret) {
                setClientSecret(res.data.clientSecret)
            }
        })
    }, [price])

    // console.log(userName, email);
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        // console.log('[error]', error);
        setCardError(error?.message || '');
        setSuccess('')
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError?.message || 'Something went wrong')
            setSuccess('')
        }
        else {
            setCardError('')
            console.log(paymentIntent);
            console.log(paymentMethod);
            setSuccess('Payment Successful')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button class="btn btn-info btn-sm mt-5" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {cardError && <p className="text-error">{cardError}</p>}
            {success && <p className="text-primary">{success}</p>}
        </form>
    )
}
