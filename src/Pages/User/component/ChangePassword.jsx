import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.svg'
import loader from '../../../assets/loader.svg'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAsync, selectChangePasswordLoader, selectPasswordChange } from '../userSlice';
import show from '../../../assets/show.svg'
import hide from '../../../assets/hide.svg'


const ChangePassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const passwordChange = useSelector(selectPasswordChange)
    const changePasswordLoader = useSelector(selectChangePasswordLoader)

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const query = new URLSearchParams(window.location.search);
    const email = (query.get('email'));
    const token = (query.get('token'));

    console.log(email);
    console.log(token);


    const handleForm = (data) => {

        console.log(data);

        if (data.newPassword != data.confirmPassword) {
            toast("PASSWORD ARE NOT SAME")
        } else {
            console.log("CHANGING PASSWORD");
            dispatch(changePasswordAsync({ ...data, email: email, token: token }))
        }

    }

    useEffect(() => {
        if (passwordChange == "success") {
            navigate("/login")
        }
    }, [passwordChange])


    return (
        <div className='w-full h-[100vh] bg-teal-800 flex flex-col justify-start items-center gap-5 pt-20 text-white'>

            <img src={logo} alt="" srcSet="" />

            <h1 className='text-xl font-bold'>CHANGE PASSWORD</h1>

            <form onSubmit={handleSubmit(handleForm)} className='w-[80%] flex flex-col gap-2 justify-center items-start'>

                <h1>New Password</h1>

                <div className='flex bg-white rounded-lg px-2 w-full'>
                    <input
                        id="newPassword"
                        type={`${show1 ? "text" : "password"}`}
                        {...register('newPassword', {
                            required: {
                                value: true,
                                message: 'Please fill password'
                            },
                        })}
                        className='bg-white w-full rounded-lg text-black' />

                    {show1 ? <img onClick={() => setShow1(!show1)} className='w-[20px]' src={show} alt="" srcSet="" /> : <img onClick={() => setShow1(!show1)} className='w-[20px]' src={hide} alt="" srcSet="" />}

                </div>

                {errors.newPassword && <p className='text-red-500 text-[12px] capitalize'>{errors.newPassword.message}</p>}

                <h1>Confirm Password</h1>

                <div className='flex bg-white rounded-lg px-2 w-full'>
                    <input
                        id="confirmPassword"
                        type={`${show2 ? "text" : "password"}`}
                        {...register('confirmPassword', {
                            required: {
                                value: true,
                                message: 'Please fill password'
                            },
                        })}
                        className='bg-white w-full rounded-lg text-black' />

                    {show2 ? <img onClick={() => setShow2(!show2)} className='w-[20px]' src={show} alt="" srcSet="" /> : <img onClick={() => setShow2(!show2)} className='w-[20px]' src={hide} alt="" srcSet="" />}

                </div>

                {errors.confirmPassword && <p className='text-red-500 text-[12px] capitalize'>{errors.confirmPassword.message}</p>}

                <button className='w-full rounded-lg bg-teal-500 py-1 mt-4'>Change Password</button>

            </form>



            {changePasswordLoader == "loading" && <img className='w-[50px] fixed bottom-20 left-[50%] -translate-x-[50%]' src={loader} alt="" srcset="" />}



        </div>
    )
}

export default ChangePassword
