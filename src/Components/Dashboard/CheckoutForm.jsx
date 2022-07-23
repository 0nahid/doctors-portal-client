import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export default function CheckoutForm({ id, price, userName, email }) {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    // console.log(id, price, userName, email);
    useEffect(() => {
        axios.post(`https://doctors-portal-web-app.herokuapp.com/create-payment-intent`, {
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
        setProcessing(true)
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
            setProcessing(false)
        }
        else {
            setCardError('')
            console.log(paymentIntent);
            setTransactionId(paymentIntent.id)  // paymentIntent.id
            setSuccess('Payment Successful')
            // if (paymentIntent.id) {
            //     Swal.fire({
            //         title: 'Payment Successful',
            //         text: `Your payment of ${price} has been successful & your transaction id is ${paymentIntent.id.slice(3)}`,
            //         icon: 'success',
            //         confirmButtonText: 'OK'
            //     }).then(() => {
            //         // window.location.reload()
            //         // window.location.href = '/dashboard'
            //     }
            //     )
            // }

            // patch the transaction id to the database
            const payment = {
                transactionId: paymentIntent.id,
                appointmentId: id,
                email: email,
            }
            axios.patch(`https://doctors-portal-web-app.herokuapp.com/api/bookings/${id}`, payment, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                }
            }).then(res => {
                setProcessing(false)
                // console.log(res.data)
                if (res.data.modifiedCount === 1) {
                    Swal.fire({
                        title: 'Payment Successful',
                        text: `Your payment of ${price} $ has been successful & your transaction id is ${paymentIntent.id.slice(3)}`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // window.location.reload()
                        // window.location.href = '/dashboard'
                    }
                    )
                }

            });
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
            <button className="btn btn-info btn-sm mt-5" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {cardError && <p className="text-error">{cardError}</p>}
        </form>
    )
}
