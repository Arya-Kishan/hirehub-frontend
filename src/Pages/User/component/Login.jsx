import React, { useState } from 'react'
import { loginGuestUserAsync, loginUserAsync, registerUserAsync, selectLoggedInUser, selectLoginLoader, selectStatus } from '../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import customer from '../../../assets/customer.svg'
import email from '../../../assets/email.svg'
import lock from '../../../assets/lock.svg'
import phone from '../../../assets/phone.svg'
import pencil from '../../../assets/pencil.svg'
import authImg from '../../../assets/authImg.svg'
import logo from '../../../assets/logo.svg'
import show from '../../../assets/show.svg'
import hide from '../../../assets/hide.svg'
import loader from '../../../assets/loader.svg'

const Login = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  // Toggling the login and sign up page
  const [toggle, setToggle] = useState(false)
  const [showPassword, SetShowPassword] = useState(false)

  const dispatch = useDispatch();
  const loginLoader = useSelector(selectLoginLoader);
  const user = useSelector(selectLoggedInUser)


  const handleLoginAsGuest = () => {
    dispatch(loginGuestUserAsync())
  }

  const handleForm = (data) => {
    console.log(data);
    if (data.email && data.name) {
      console.log("register");
      dispatch(registerUserAsync(data))
    } else {
      console.log("login");
      dispatch(loginUserAsync(data))
    }
  }

  return (
    <div className='w-full min-h-[100vh] flex flex-wrap'>
      {user && <Navigate to='/' />}

      <div className='w-[100vw] h-[100vh] lg:w-[50vw] lg:h-[100vh] bg-teal-800 flex flex-col gap-5 justify-center items-center relative'>

        <div>
          <img src={logo} alt="" srcSet="" />
        </div>

        <h1 className='text-1xl text-white'>{toggle ? "Create a new Account" : "Login to your Account"}</h1>

        <form onSubmit={handleSubmit(handleForm)} className='flex flex-col gap-6'>

          {toggle &&
            <>
              {/* ROLE */}
              <div className='flex flex-col'>

                <div className='bg-white flex gap-2 w-[300px] h-[40px] rounded-lg'>

                  <select {...register("role")} className='w-[90%] rounded-lg outline-none border-none'>
                    <option value="applicant">Applicant</option>
                    <option value="employer">Employer</option>
                  </select>

                  <img className='w-[10%] bg-teal-500 p-[2px] rounded-r-lg' src={customer} alt="" srcSet="" />

                </div>

              </div>

              {/* NAME */}
              <div className='flex flex-col'>

                <div className='bg-white flex gap-2 w-[300px] h-[40px] rounded-lg'>
                  <input {...register("name", {
                    required: {
                      value: true,
                      message: "Name must be Given"
                    },
                    minLength: {
                      value: 3,
                      message: "Name must be greater than 3 letters"
                    }
                  })}
                    placeholder='Name...'
                    className='w-[90%] rounded-lg outline-none border-none'
                  />

                  <img className='w-[10%] bg-teal-500 p-[2px] rounded-r-lg' src={pencil} alt="" srcSet="" />

                </div>

                {errors.name && <p className='text-[11px] text-yellow-400'>{errors.name?.message}</p>}

              </div>

              {/* PHONE */}
              <div className='flex flex-col'>

                <div className='bg-white flex gap-2 w-[300px] h-[40px] rounded-lg'>
                  <input {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone Number must be Given"
                    },
                    minLength: {
                      value: 9,
                      message: "Phone must be greater than 9 Numbers"
                    }
                  })}
                    placeholder='Phone...'
                    className='w-[90%] rounded-lg outline-none border-none'
                  />

                  <img className='w-[10%] bg-teal-500 p-[2px] rounded-r-lg' src={phone} alt="" srcSet="" />

                </div>

                {errors.phone && <p className='text-[11px] text-yellow-400'>{errors.phone?.message}</p>}

              </div>
            </>
          }

          {/* EMAIL */}
          <div className='flex flex-col'>

            <div className='bg-white flex gap-2 w-[300px] h-[40px] rounded-lg'>
              <input {...register("email", {
                required: {
                  value: true,
                  message: "Email must be Given"
                },
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "invalid email please fill correct email"
                },
                minLength: {
                  value: 3,
                  message: "Email must be greater than 3 letters"
                }
              })}
                placeholder='Email...'
                className='w-[90%] rounded-lg outline-none border-none'
              />

              <img className='w-[10%] bg-teal-500 p-[2px] rounded-r-lg' src={email} alt="" srcSet="" />

            </div>

            {errors.email && <p className='text-[11px] text-yellow-400'>{errors.email?.message}</p>}

          </div>

          {/* PASSWORD */}
          <div className='flex flex-col relative'>

            <p onClick={() => navigate("/forgotPassword")} className='text-white w-full text-end text-[12px] absolute -top-[50%] right-0 cursor-pointer'>Forgot Password</p>

            <div className='bg-white flex gap-2 w-[300px] h-[40px] rounded-lg'>
              <input {...register("password", {
                required: {
                  value: true,
                  message: "Password must be Given"
                },
                minLength: {
                  value: 1,
                  message: "Password must be greater than 3 letters"
                }
              })}
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder='Password...'
                className='w-[90%] rounded-lg outline-none border-none'
              />

              {showPassword ? <img onClick={() => SetShowPassword(false)} className='w-[15px]' src={show} alt="" srcSet="" /> : <img onClick={() => SetShowPassword(true)} className='w-[15px]' src={hide} alt="" srcSet="" />}

              <img className='w-[10%] bg-teal-500 p-[2px] rounded-r-lg' src={lock} alt="" srcSet="" />

            </div>

            {errors.password && <p className='text-[11px] text-yellow-400'>{errors.password?.message}</p>}

          </div>

          {toggle
            ? <>

              <button type='submit' className='w-[100%] h-[30px] text-white bg-teal-500 rounded-lg'>Register</button>

              <h1 className='text-center text-white'>OR</h1>

              <button type='button' onClick={() => setToggle(false)} className='w-[100%] h-[30px] text-white border-solid border-2 border-white rounded-lg'>Login</button>

            </>
            :
            <>

              <button type='submit' className='w-[100%] h-[30px] text-white bg-teal-500 rounded-lg'>Login</button>

              <h1 className='text-center text-white'>OR</h1>

              <button type='button' onClick={() => setToggle(true)} className='w-[100%] h-[30px] text-white border-solid border-2 border-white rounded-lg'>Register</button>

            </>}

        </form>

        <button onClick={handleLoginAsGuest} className='absolute bottom-0 left-[50%] -translate-x-[50%] -translate-y-[50%] text-white'>
          Log In As Guest
        </button>

      </div>

      <div className='hidden w-[100vw] lg:w-[50vw] lg:h-[100vh] bg-teal-800 lg:flex justify-center items-center'>
        <img className='w-[10%] lg:w-[60%]' src={authImg} alt="Img" srcSet="" />
      </div>

      {loginLoader == "loading" ? <img className='w-[50px] fixed top-[10%] left-[50%] -translate-x-[50%]' src={loader} alt="" srcset="" /> : ""}

    </div>
  )
}

export default Login
