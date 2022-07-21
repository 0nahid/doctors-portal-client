import React from 'react'

export default function Doctors({ user, index, refetch }) {
    const {name,mail,image,speciality} = user;
    return (
        <tr>
            <td>{index+1}</td>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-circle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{name}</div>
                        <div class="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                Zemlak, Daniel and Leannon
                <br />
                <span class="badge badge-ghost badge-sm">{speciality}</span>
            </td>
            <td>{mail}</td>
            <th>
                <button class="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    )
}
