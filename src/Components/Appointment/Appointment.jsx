import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Footer from '../Shared/Footer/Footer';
import Loading from '../Shared/Loading/Loading';
import AppointmentBanner from './AppointmentBanner';
import AvailableAppointment from './AvailableAppointment';

export default function Appointment() {
    const [date, setDate] = useState(new Date());
    const [user ,loading] = useAuthState(auth)
    if (user) {
        <Loading />
    }
    return (
        <div>
            <AppointmentBanner date={date} setDate={setDate} />
            <AvailableAppointment date={date} />
            <Footer />
        </div>
    )
}
