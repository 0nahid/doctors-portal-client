import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Loader from '../Shared/Loader/Loader'
export default function Payment() {
  const { id } = useParams()
  const { data: services, isLoading } = useQuery(['payment'], () => axios.get(`http://localhost:5500/api/bookings/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('aceessToken')}`
    }
  }))
  console.log(services.data);
  const { name, price, formattedDate: date, slot ,userName } = services.data;
  // console.log(price);
  if (isLoading) return <Loader />
  return (
    <div>
      <h1>Payment of {id}</h1>
      <div class="card w-50 bg-base-100 shadow-xl my-12">
        <div class="card-body">
          <p class="text-2xl font-semibold">Grettings <span class="text-success">{userName.toUpperCase()}</span> </p>
          <h2 class="card-title font-bold text-neutral">Pay for {name.toUpperCase()}</h2> 
          <p className='text-xl'>Your Appointmemnt on <span className="text-error">{date} </span> at {slot} </p>
          <p className='text-xl'>Please pay <span className="font-bold text-xl">{price}$</span> </p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">

        </div>
      </div>
    </div>
  )
}
