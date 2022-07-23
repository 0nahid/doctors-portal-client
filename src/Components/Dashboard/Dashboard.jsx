import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import useAdmin from '../Hooks/useAdmin'
export default function Dashboard() {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    // console.log(admin);
    return (
        <div className="drawer drawer-mobile">

            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col  ">
                <h1 className="text-2xl text-secondary font-bold ">Welcome to dashboard</h1>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <li><Link to="/dashboard">My Appointment</Link></li>
                    <li><Link to="/dashboard/review">Review</Link></li>
                    {admin && <>
                        <li><Link to="/dashboard/users">Users</Link></li>
                        <li><Link to="/dashboard/addDoctors">Add Doctors</Link></li>
                        <li><Link to="/dashboard/manageDoctors">Manage Doctors</Link></li>
                    </>}
                </ul>

            </div>
        </div>
    )
}
