import { useEffect } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from "../../firebase.init";
import Loading from '../Shared/Loading/Loading';
export default function Login() {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [user, loading] = useAuthState(auth)
    const [
        signInWithEmailAndPassword,
        sUser,
        sLoading,
        sError,
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // console.log(data)
        signInWithEmailAndPassword(data.mail, data.password);
    };

    useEffect(()=>{
        if (gUser || sUser || user) {
            navigate(from, { replace: true });
            toast.success(`Welcome Back, ${auth?.currentUser?.displayName}`, {
                autoClose: 4000,
            })
        }
    },[from, gUser, sUser, user, navigate])


    let signInError;
    (gError || sError) ?
        signInError = <p className='text-red-500'><small>{sError?.message || gError?.message}</small></p> : signInError = ''

    if (gLoading || sLoading) {
        return <Loading />
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid place-items-center">
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" className="input input-bordered w-full max-w-xs"{...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: "Password must be at least 8 characters, contain at least one letter and one number"
                                        }
                                    })} />

                                    <label className="label">
                                        <span className="label-text-alt"> <p className="text-error">{errors.password?.message}</p></span>
                                    </label>
                                </div>
                                {signInError}
                                <div className="text-center">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                            <p className="text-sm mt-2">New to Doctors Portal? <Link className="text-primary" to="/signup">Create an account!!!</Link> </p>
                        </div>
                        <div className="divider">OR</div>
                        <div className="grid place-items-center justify-items-center">
                            <button className="btn btn-secondary text-white font-bold"
                                onClick={() => signInWithGoogle()}
                            ><FcGoogle className="w-6 h-6 mr-1" />Login with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
