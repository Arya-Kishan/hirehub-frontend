import React from 'react'
import logo from '../../../assets/logo.svg'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAsync, selectForgotPasswordLoader } from '../userSlice'
import Loader from '../../../Features/Loader'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const forgotPasswordLoader = useSelector(selectForgotPasswordLoader)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const handleForm = (data) => {
        console.log(data);
        dispatch(forgotPasswordAsync(data))
    }


    return (
        <div className='w-full h-[100vh] bg-teal-800 flex flex-col justify-start items-center gap-6 pt-20 text-white'>

            <img loading='lazy' src={logo} alt="" srcSet="" />

            <h1 className='text-xl font-bold'>FORGOT PASSWORD</h1>

            <form onSubmit={handleSubmit(handleForm)} className='w-[80%] flex flex-col gap-2 justify-center items-start'>

                <h1>Email Address of Your Account</h1>

                <input
                    id="email"
                    type="email"
                    {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "invalid email id please fill correct email id"
                        },
                        required: {
                            value: true,
                            message: 'Please fill your email id'
                        },
                    })}
                    className='bg-white w-full rounded-lg text-black'
                    placeholder='Enter your email ...' />

                {errors.email && <p className='text-red-500 text-[12px] capitalize'>{errors.email.message}</p>}

                <button className='w-full rounded-lg bg-teal-500 py-1 mt-5'>Send Email</button>

            </form>


            {forgotPasswordLoader == "loading" && <div className='w-[50px] fixed bottom-20 left-[50%] -translate-x-[50%]'><Loader /></div>}

        </div>
    )
}

export default ForgotPassword
