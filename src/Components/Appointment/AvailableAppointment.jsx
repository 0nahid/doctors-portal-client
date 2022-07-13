import axios from 'axios';
import { format } from "date-fns";
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

export default function AvailableAppointment({ date }) {
    // const [services, setServices] = useState([])
    const [loading] = useAuthState(auth)
    const [treatment, setTreatment] = useState(null)
    const formattedDate = format(date, 'PP');
    const { data: services, refetch, isLoading } = useQuery(['available', formattedDate], () => axios.get(`https://doctors-portal-web-app.herokuapp.com/api/available?date=${formattedDate}`)

    );
    if (isLoading || loading) {
        <Loading />
    }

    return (
        <div>
            <h1 className="text-2xl text-primary text-center mt-5">Available Appointments on {format(date, 'PP')}  </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                {services?.data?.map(service => <Service key={service._id} service={service} setTreatment={setTreatment} />)}
            </div>
            {
                treatment && <BookingModal
                    treatment={treatment}
                    date={date}
                    setTreatment={setTreatment}
                    refetch={refetch}
                />
            }
        </div>
    )
}
