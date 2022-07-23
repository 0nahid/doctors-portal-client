import {
    Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Loader from '../Shared/Loader/Loader'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)
// console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


export default function Payment() {
  const { id } = useParams()
  const { data: services, isLoading } = useQuery(['payment'], () => axios.get(`https://doctors-portal-web-app.herokuapp.com/api/bookings/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('aceessToken')}`
    }
  }))
  // console.log(services);
  if (isLoading) return <Loader />

  const { name: treatmentName, price, formattedDate: date, slot, userName,email } = services?.data;
  // console.log(services?.data);

  return (
    <div>
      <h1>Payment of {id}</h1>
      <div className="card w-50 bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <p className="text-2xl font-semibold">Grettings <span className="text-success">{userName.toUpperCase()}</span> </p>
          <h2 className="card-title font-bold text-neutral">Pay for {treatmentName?.toUpperCase()}</h2>
          <p className='text-xl'>Your Appointmemnt on <span className="text-error">{date} </span> at {slot} </p>
          <p className='text-xl'>Please pay <span className="font-bold text-xl">{price}$</span> </p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id} price={price} userName={userName} email={email} />
          </Elements>
        </div>
      </div>
    </div>
  )
}
