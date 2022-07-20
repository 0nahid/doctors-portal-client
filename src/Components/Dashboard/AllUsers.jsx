import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../Shared/Loader/Loader';
import Loading from '../Shared/Loading/Loading';
import Users from './Users';
export default function AllUsers() {
    const { data: users, isLoading, refetch } = useQuery(['available'], () => axios.get(`http://localhost:5500/api/users`,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        }
    ))
    // console.log(users?.data);


    if (isLoading) return <Loading />
    return (
        <>
            {
                !isLoading ? (
                    <div>
                        <div className="container mx-auto">
                            <h1 className="text-center text-xl font-medium mb-5">My user</h1>
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Email</th>
                                        <th>Admin</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.data?.map((user, index) => (
                                        <Users user={user} key={user?._id} index={index} refetch={refetch} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )
            }
        </>
    )
}
