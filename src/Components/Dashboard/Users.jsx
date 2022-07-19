import React from 'react';
import toast from 'react-hot-toast';

export default function Users({ user, index, refetch }) {
    const makeAdmin = (email) => {
        fetch(`http://localhost:5500/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        }).then(res => {
            if (res.status === 403) {
                toast.error('You are not authorized to make this user an admin');
            }
            return res.json()
        })
            .then(data => {
                console.log(data);
                if (data.matchedCount === 1) {
                    toast.success(`${email} successfully an admin`);
                    refetch();
                }
            })
    }
    return (
        <tr key={user?._id}>
            <td>{index + 1}</td>
            <td>{user?.email}</td>
            <td>
                {user?.role === 'admin' ?
                    <button class="btn btn-success">Already an admin</button>
                    : <button
                        onClick={() => makeAdmin(user?.email)}
                        class="btn btn-ghost">Make Admin</button>}
            </td>

            <td>
                <button class="btn btn-error">Delete</button>
            </td>

        </tr>
    )
}
