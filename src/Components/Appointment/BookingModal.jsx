import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';

export default function BookingModal({ treatment, date, setTreatment, refetch }) {
    const [user, loading] = useAuthState(auth);
    // console.log(treatment);
    const { _id, name, slots } = treatment;
    const formattedDate = format(date, 'PP');
    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        const name = treatment?.name;
        const price = treatment?.price;
        const userName = user.displayName;
        const email = user?.email;
        // const email = e.target.email.value;
        const phone = e.target.phone.value;
        const data = {
            name,
            userName,
            email,
            phone,
            slot,
            formattedDate,
            price,
            treatment: _id
        }
        // console.log(data);
        axios.post(`https://doctors-portal-web-app.herokuapp.com/api/bookings`, data)
            .then(res => {
                // console.log(res.data);
                // if (res.status === 200) {
                //     setTreatment(null);
                //     toast.success('Appointment booked successfully');
                // }
                if (res.data.success === true) {
                    setTreatment(null);
                    toast.success(`Appointment is set on ${formattedDate} at ${slot} `);
                    refetch();
                }
                else {
                    toast.error(`You already have an appointment on ${res?.data?.booking.formattedDate} at ${res?.data?.booking.slot}`);
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-secondary">{name}</h3>
                    <form className="grid grid-col-1 gap-3 justify-items-center "
                        onSubmit={handleBooking}
                    >
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered input-secondary w-full max-w-xs" />
                        <select name="slot" className="select select-secondary w-full max-w-xs">
                            {slots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                        <input required type="text" name="name" disabled value={user?.displayName} className="input input-bordered input-secondary w-full max-w-xs" />
                        <input required type="email" name="email" disabled value={user?.email} className="input input-bordered input-secondary w-full max-w-xs" />
                        <input required type="number" name="phone" placeholder="Your phone" className="input input-bordered input-secondary w-full max-w-xs" />
                        <input required type="Submit" placeholder="Type here" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </>
    )
}
