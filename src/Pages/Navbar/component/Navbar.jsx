import React, { useEffect, useRef } from 'react'
import profile from "../../../assets/profile.svg"
import logo from "../../../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navRef = useRef(null)


  return (
    <div ref={navRef} className='w-full h-[60px] bg-white flex items-center justify-between px-4 fixed top-0 left-0 z-10'>

      <div className='flex gap-2 justify-center items-center'>
        <img className='w-[40px]' src={logo} alt="" srcSet="" />
        <h1 className='text-3xl font-bold'>HireHub</h1>
      </div>

      <ul className='hidden md:flex gap-6 justify-center items-center'>
        <Link to={'/'} className='list cursor-pointer'>Home</Link>
        <Link to={'/job'} className='list cursor-pointer'>All Jobs</Link>
        <Link to={'/application'} className='list cursor-pointer'>My Applications</Link>
        <Link to={'/community'} className='list cursor-pointer'>Community</Link>
        <Link to={'/profile'} className='list cursor-pointer'><img className='w-[30px]' src={profile} alt="" /></Link>
      </ul>

    </div>
  )
}

export default Navbar
