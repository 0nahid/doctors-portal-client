import React from 'react';
import toast from 'react-hot-toast';

export default function Users({ user, index, refetch }) {
    const makeAdmin = (email) => {
        fetch(`https://doctors-portal-web-app.herokuapp.com/user/admin/${email}`, {
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
                    <button className="btn btn-success">Already an admin</button>
                    : <button
                        onClick={() => makeAdmin(user?.email)}
                        className="btn btn-ghost">Make Admin</button>}
            </td>

            <td>
                <button className="btn btn-error">Delete</button>
            </td>

        </tr>
    )
}
