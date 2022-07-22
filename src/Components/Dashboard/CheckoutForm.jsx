import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckoutForm({ id }) {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        event.reset();
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

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
            toast.error(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            toast.success('Payment Successful')
            axios.post(`http://localhost:5500/api/booking/payment/${id}`, paymentMethod, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                }
            })
                .then(res => {
                    console.log(res);
                }
                )
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
            <button class="btn btn-info btn-sm mt-5" type="submit" disabled={!stripe}>
                Pay
            </button>
            {cardError && <p className="text-error">{cardError}</p>}
        </form>
    )
}
