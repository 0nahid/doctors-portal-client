import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
export default function AddDcotors() {
    const { data: services, isLoading } = useQuery('services', () => axios.get(`https://doctors-portal-web-app.herokuapp.com/api/services`));
    // console.log(services.data);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgbbApi = 'a243f030b37702a67079d2a90f4a170e'
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApi}`

    const onSubmit = async data => {
        // console.log(data);
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        const res = await axios.post(imgbbUrl, formData);
        if (res.data.success) {
            const imageUrl = res.data.data.url
            const newDoctor = {
                name: data.name,
                mail: data.mail,
                image: imageUrl,
                speciality: data.speciality
            }
            const doctorsData = await axios.post(`https://doctors-portal-web-app.herokuapp.com/api/doctors`, newDoctor, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                }
            });
            if (doctorsData.data.insertedId) {
                toast.success('Doctor added successfully');
            }
        }

    }
    // console.log(errors);
    if (isLoading) {
        <Loading />
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full max-w-xs"{...register("name",
                        {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                            pattern: {
                                value: /^[a-z ,.'-]+$/i,
                                message: 'Name is not valid',
                            }
                        })} />
                    <label className="label">
                        <span className="label-text-alt"> <p className="text-error">{errors.name?.message}</p></span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" className="input input-bordered w-full max-w-xs"{...register("mail",
                        {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                ,
                                message: 'Email is not a valid email address'
                                ,
                            }
                        })} />
                    <label className="label">
                        <span className="label-text-alt"> <p className="text-error">{errors.mail?.message}</p></span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select {...register("speciality")} className="select select-primary w-full max-w-xs">
                        {services?.data?.map((service, index) => {
                            return <option key={index} value={service.id}>{service.name}</option>
                        })}
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" className="input input-bordered w-full max-w-xs"{...register("image",
                        {
                            required: {
                                value: true,
                                message: "Image is required"
                            }

                        })} />
                    <label className="label">
                        <span className="label-text-alt"> <p className="text-error">{errors.image?.message}</p></span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs text-center mt-2">
                    <button className="btn btn-primary" type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}
