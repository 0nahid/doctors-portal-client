import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';

export default function ManageDoctors() {

    const { data: doctors, isLoading } = useQuery('doctors', () => fetch('http://localhost:5500/api/doctors', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    console.log(doctors);
    if (isLoading) {
        <Loading />
    }
    return (
        <div>
            <h1>Manage Doctors from here</h1>
        </div>
    )
}
