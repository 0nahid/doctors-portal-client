import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loader from '../Shared/Loader/Loader';
import Loading from '../Shared/Loading/Loading';
export default function AllUsers() {
    const { data: users, isLoading, refetch } = useQuery(['available'], () => axios.get(`http://localhost:5500/api/users`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('aceessToken')}`
        }
    }))

    // console.log(users?.data);

    const makeAdmin = (email) => {
        axios.put(`http://localhost:5500/api/user/admin/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        }).then(res => {
            if (res.data.modifiedCount === 1) {
                toast.success(`${email} is now an admin`);
                refetch();
            }

        }).catch(err => {
            if (err.response.data.success === false) {
                toast.error(err.response.data.message);
            }
        })

        // console.log('make admin',email);
    }

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
                                        <tr key={user?._id}>
                                            <td>{index + 1}</td>
                                            <td>{user?.email}</td>
                                            <td>{user?.admin ? <button class="btn btn-warning">Remove Admin</button> : <button
                                                onClick={() => makeAdmin(user?.email)}
                                                class="btn btn-ghost">Make Admin</button>}</td>
                                            <td><button class="btn btn-error">Delete</button>
                                            </td>
                                        </tr>
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
