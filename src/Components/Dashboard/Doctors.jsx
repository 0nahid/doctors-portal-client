import React from 'react';
import toast from 'react-hot-toast';

export default function Doctors({ user, index, refetch }) {
    const { name, mail, image, speciality } = user;
    const deleteDoctor = (mail) => {
        fetch(`https://doctors-portal-web-app.herokuapp.com/api/doctors/${mail}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        }).then(res => {
            if (res.status === 403) {
                toast.error('You are not authorized to delete this user');
            }
            return res.json()
        }).then(data => {
            console.log(data);
            if (data.deletedCount === 1) {
                toast.success(`${mail} successfully deleted`);
                refetch();
            }
        }).catch(err => {
            toast.error(err.message);
        }
        )

    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name.toUpperCase()}</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm font-bold">{speciality.toUpperCase()}</span>
            </td>
            <td>{mail}</td>
            <th>
                <button
                    onClick={() => deleteDoctor(mail)}
                    className="btn btn-error btn-xs">Delete</button>
            </th>
        </tr>
    )
}
