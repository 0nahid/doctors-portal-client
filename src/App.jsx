import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Appointment from './Components/Appointment/Appointment'
import Login from './Components/Authentication/Login'
import RequiredAdmin from './Components/Authentication/RequiredAdmin'
import RequiredAuth from './Components/Authentication/RequiredAuth'
import SignUp from './Components/Authentication/SignUp'
import AddDcotors from './Components/Dashboard/AddDcotors'
import AllUsers from './Components/Dashboard/AllUsers'
import Dashboard from './Components/Dashboard/Dashboard'
import ManageDoctors from './Components/Dashboard/ManageDoctors'
import MyAppointment from './Components/Dashboard/MyAppointment'
import MyReview from './Components/Dashboard/MyReview'
import Payment from './Components/Dashboard/Payment'
import Home from './Components/Home/Home'
import Loader from './Components/Shared/Loader/Loader'
import Navbar from './Components/Shared/Navbar/Navbar'
import NoMatch from './Components/Shared/NoMatch/NoMatch'

export default function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {
          loading ? (
            <Loader />
          ) :
            <Navbar />
        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<RequiredAuth><Appointment /></RequiredAuth>} />
          <Route path="/dashboard" element={<RequiredAuth><Dashboard /></RequiredAuth>} >
            <Route index element={<MyAppointment />} />
            <Route path="review" element={<MyReview />} />
            <Route path="users" element={<RequiredAdmin><AllUsers /></RequiredAdmin>} />
            <Route path="addDoctors" element={<RequiredAdmin><AddDcotors /></RequiredAdmin>} />
            <Route path="manageDoctors" element={<RequiredAdmin><ManageDoctors /></RequiredAdmin>} />
            <Route path="payment/:id" element={<Payment />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}
