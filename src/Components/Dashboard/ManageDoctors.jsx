import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../Shared/Loader/Loader';
import Loading from '../Shared/Loading/Loading';
import Doctors from './Doctors';

export default function ManageDoctors() {

    // const [doctors, setDoctors] = useState([]);
    // useEffect(() => {
    //     fetch(`https://doctors-portal-web-app.herokuapp.com/api/doctors`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('aceessToken')}`
    //         }

    //     })
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, [])
    const { data: doctors, isLoading, refetch } = useQuery(['doctors'], () => axios.get(`https://doctors-portal-web-app.herokuapp.com/api/doctors`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
        }
    }))
    // console.log(doctors?.data);
    if (isLoading) return <Loading />
    return (
        <>
            {!isLoading ? (<div>
                <h1>Manage all the {doctors?.data?.length} Doctors from here</h1>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>SL.</th>
                                <th>Name</th>
                                <th>Speciality</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors?.data?.map((user, index) => (
                                <Doctors user={user} key={user?._id} index={index} refetch={refetch} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >) : (
                <Loader />
            )}
        </>

    )
}
