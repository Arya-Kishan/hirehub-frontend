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
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectUserId } from '../../User/userSlice'
import { getNotificationsAsync, handleRequestAsync, selectMyNotification } from '../../Community/communitySlice'

const Navbar = () => {

  const navRef = useRef(null)
  const loggedInUserId = useSelector(selectUserId)
  const myNotifications = useSelector(selectMyNotification)
  const dispatch = useDispatch()

  // BELOW STATE USED FOR HANDLING THE PROFILE ICON OPTIONS
  const [toggle1, setToggle1] = useState(false)

  // BELOW STATE USED FOR HANDLING THE NOTIFICATION DRAWER
  const [toggle2, setToggle2] = useState(false)

  const handleLogout = () => {
    localStorage.setItem("x-jwt-routes", null)
    dispatch(logoutUser())
  }

  const handleNotification = () => {
    setToggle2(!toggle2)
    setToggle1(false)
  }

  const handleFriendRequest = (requestResult, notificationId) => {

    if (requestResult == "accept") {
      console.log("accepted");
      dispatch(handleRequestAsync({ query: `requestResult=accept&notificationId`, notificationId: notificationId }))
    } else {
      console.log("rejected");
      dispatch(handleRequestAsync({ query: `requestResult=reject&notificationId`, notificationId: notificationId }))

    }
  }

  useEffect(() => {
    dispatch(getNotificationsAsync(loggedInUserId))
  }, [])


  return (
    <div ref={navRef} className='w-full h-[60px] flex items-center justify-between px-4 fixed top-0 left-0 z-10 bg-white'>

      <div className='flex gap-2 justify-center items-center'>
        <img className='w-[40px]' src={logo} alt="" srcSet="" />
        <h1 className='text-3xl font-bold'>HireHub</h1>
      </div>

      {/* NOTIFICATION DRAWER */}
      <div onClick={handleNotification} className={`w-full h-[calc(100vh-70px)] flex justify-end items-start fixed top-0 right-0 translate-y-[70px] transition ${toggle2 ? "translate-x-[0vw]" : "translate-x-[100vw]"} `}>

        <div onClick={e => e.stopPropagation()} className='w-[200px] md:w-[300px] h-[100%] flex flex-col justify-start items-start gap-5 bg-teal-500'>

          <h1 className='w-full text-center text-2xl'>Notification :</h1>

          {myNotifications?.length > 0 ? myNotifications?.map((e) => (
            <>
              {e.senderId.name && <div className='flex flex-col items-start justify-start gap-2 pl-5'>

                <p className='text-1xl text-white'> * {e.senderId.name} send friend request</p>

                <div className='w-full flex justify-center md:justify-end items-center gap-2'>

                  <button onClick={() => handleFriendRequest("accept", e._id)} className='bg-white text-1xl px-2 py-1'>Accept</button>
                  <button onClick={() => handleFriendRequest("reject", e._id)} className='bg-white text-1xl px-2 py-1'>Reject</button>

                </div>

              </div>}

            </>
          )) : <p className='text-white pl-2'>No Notification</p>}

        </div>

      </div>

      {/* FOR LARGE DEVICE */}
      <ul className='hidden md:flex gap-6 justify-center items-center relative'>
        <Link to={'/'} className='list cursor-pointer'>Home</Link>
        <Link to={'/job'} className='list cursor-pointer'>All Jobs</Link>
        <Link to={'/application'} className='list cursor-pointer'>My Applications</Link>
        <Link to={'/community'} className='list cursor-pointer'>Community</Link>
        <span className='cursor-pointer'><img onClick={() => setToggle1(!toggle1)} className='w-[30px]' src={profile} alt="" /></span>
      </ul>

      {/* FOR MOBILE DEVICE */}
      <div
        className='w-full flex justify-evenly md:hidden fixed bottom-0 right-0 bg-teal-500 p-2'>
        <Link to={'/job'} className='list cursor-pointer'><img className='w-[25px]' src={job} alt="" srcSet="" /></Link>
        <Link to={'/application'} className='list cursor-pointer'><img className='w-[25px]' src={application} alt="" srcSet="" /></Link>
        <Link to={'/'} className='list cursor-pointer'><img className='w-[25px]' src={home} alt="" srcSet="" /></Link>
        <Link to={'/community'} className='list cursor-pointer'><img className='w-[25px]' src={community} alt="" srcSet="" /></Link>
        <span className='cursor-pointer'><img onClick={() => setToggle1(!toggle1)} className='w-[30px]' src={profile} alt="" /></span>
      </div>

      {/* BELOW DIV USED FOR SHOWING PROFILE BAR OPTIONS */}
      {toggle1 && <div onClick={() => setToggle1(false)} className='w-full h-[calc(100vh-100px)] fixed top-[60px] left-0'>

        <div onClick={e => e.stopPropagation()} className='absolute bottom-[10px] md:top-[10px] right-2 h-[100px] bg-teal-500 px-5 py-2 text-xl text-white font-bold'>
          <Link to={`/profile/${loggedInUserId}`}>Profile</Link>
          <p onClick={handleLogout}>Logout</p>
          <p onClick={handleNotification}>Notification</p>
        </div>

      </div>}

    </div>
  )
}

export default Navbar
