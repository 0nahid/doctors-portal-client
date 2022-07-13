import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Appointment from './Components/Appointment/Appointment'
import Login from './Components/Authentication/Login'
import RequiredAuth from './Components/Authentication/RequiredAuth'
import SignUp from './Components/Authentication/SignUp'
import Dashboard from './Components/Dashboard/Dashboard'
import MyAppointment from './Components/Dashboard/MyAppointment'
import MyReview from './Components/Dashboard/MyReview'
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
          <Route path="/appointment" element={
            <RequiredAuth>
              <Appointment />
            </RequiredAuth>
          } />
          <Route path="/dashboard" element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          } >
            <Route index element={<MyAppointment />} />
            <Route path="review" element={<MyReview />} />
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
