import axios from 'axios'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import auth from '../../firebase.init'
import Loader from '../Shared/Loader/Loader'

export default function MyAppointment() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    // console.log(user?.email);
    const [loading, setLoading] = useState(true)
    const [myappointments, setMyappointments] = useState([])
    // const aceessToken = localStorage.getItem('aceessToken')
    // console.log(aceessToken);
    useEffect(() => {
        axios.get(`https://doctors-portal-web-app.herokuapp.com/api/bookings?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        })
            .then(data => {
                setMyappointments(data.data)
                setLoading(false)
            }).catch(err => {
                if (err.response.status === 401) {
                    signOut(auth)
                    localStorage.removeItem("accessToken");
                    navigate('/login')
                }
            });

    }, [user?.email, navigate])
    return (
        <>
            {
                !loading ? (
                    <div className="container mx-auto">
                        <h1 className="text-center text-xl font-medium mb-5">My appointment</h1>
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Appointment Name</th>
                                    <th>Appointment No</th>
                                    <th>Email</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Schedule</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myappointments?.map((appointment, index) => (
                                    <tr key={appointment?._id}>
                                        <td>{index + 1}</td>
                                        <td>{appointment?.name}</td>
                                        <td>{appointment?.treatment}</td>
                                        <td>{appointment?.email}</td>
                                        <td>{appointment?.formattedDate}</td>
                                        <td>{appointment?.slot}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <Loader />
                )
            }
        </>
    )
}
