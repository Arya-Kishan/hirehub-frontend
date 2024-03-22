import React, { useEffect, useRef, useState } from 'react'
import profile from "../../../assets/profile.svg"
import logo from "../../../assets/logo.svg"
import menu from "../../../assets/menu.svg"
import home from "../../../assets/home.svg"
import job from "../../../assets/job.svg"
import community from "../../../assets/community.svg"
import application from "../../../assets/application.svg"
import cross from "../../../assets/cross.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../User/userSlice'

const Navbar = () => {

  const navRef = useRef(null)
  const loggedInUserId = useSelector(selectUserId)


  return (
    <div ref={navRef} className='w-full h-[60px] bg-white flex items-center justify-between px-4 fixed top-0 left-0 z-10'>

      <div className='flex gap-2 justify-center items-center'>
        <img className='w-[40px]' src={logo} alt="" srcSet="" />
        <h1 className='text-3xl font-bold'>HireHub</h1>
      </div>

      {/* FOR LARGE DEVICE */}
      <ul className='hidden md:flex gap-6 justify-center items-center'>
        <Link to={'/'} className='list cursor-pointer'>Home</Link>
        <Link to={'/job'} className='list cursor-pointer'>All Jobs</Link>
        <Link to={'/application'} className='list cursor-pointer'>My Applications</Link>
        <Link to={'/community'} className='list cursor-pointer'>Community</Link>
        <Link to={`/profile/${loggedInUserId}`} className='list cursor-pointer'><img className='w-[30px]' src={profile} alt="" /></Link>
      </ul>

      {/* FOR MOBILE DEVICE */}
      <div
        className='w-full flex justify-evenly md:hidden fixed bottom-0 right-0 bg-teal-500 p-2'>
        <Link to={'/'} className='list cursor-pointer'><img className='w-[25px]' src={home} alt="" srcset="" /></Link>
        <Link to={'/job'} className='list cursor-pointer'><img className='w-[25px]' src={job} alt="" srcset="" /></Link>
        <Link to={'/application'} className='list cursor-pointer'><img className='w-[25px]' src={application} alt="" srcset="" /></Link>
        <Link to={'/community'} className='list cursor-pointer'><img className='w-[25px]' src={community} alt="" srcset="" /></Link>
        <Link to={`/profile/${loggedInUserId}`} className='list cursor-pointer'><img className='w-[30px]' src={profile} alt="" /></Link>
      </div>

    </div>
  )
}

export default Navbar
