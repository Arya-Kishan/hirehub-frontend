import React, { useEffect, useState } from 'react'
import logo from "../../../assets/logo.svg"
import bigImg6 from "../../../assets/bigImg6.svg"
import pc from "../../../assets/pc.svg"
import post from "../../../assets/post.svg"
import blog from "../../../assets/blog.svg"
import setting from "../../../assets/setting.svg"
import profile from "../../../assets/customer1.svg"
import pencil from "../../../assets/pencil.svg"
import menu from "../../../assets/menu.svg"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostAsync, selectUserPosts } from '../communitySlice'
import Card from '../../../Features/Card'
import { selectUserId } from '../../User/userSlice'
import { useNavigate } from 'react-router-dom'
import { setBlogDrawer } from '../../Blogs/blogsSlice'

const hashArr = ["Web", "Designer", "Frontend", "Software", "Anime", "Job"]

const Community = () => {

  const [toggle, setToggle] = useState("-left-[100vw]")

  const dispatch = useDispatch()
  const posts = useSelector(selectUserPosts)
  const loggedInUserId = useSelector(selectUserId)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPostAsync("page=0"));
  }, [])

  return (
    <div className='w-full h-[100vh] flex flex-col md:flex-row bg-gray-200 mt-[70px] overflow-hidden'>

      {/* LEFT BOX */}
      <div onClick={() => setToggle("-left-[100vw]")} className={`w-full h-[100vh] fixed top-0 ${toggle} bg-gradient-to-t from-black transition-all duration-700 pt-[70px]`}>

        <div onClick={(e) => e.stopPropagation()} className={`w-[250px] md:w-[20%] h-[calc(100vh-120px)] md:flex flex-col justify-start items-start gap-5 bg-gray-500`}>

          {/* LOGO */}
          <div className='flex items-center gap-2'>
            <img className='w-[50px]' src={logo} alt="" />
            <h1 className='text-3xl text-white font-bold'>HireHub</h1>
          </div>

          {/* SEVERAL OPTOINS LIKE SETTING, PROFILE */}
          <div className='flex flex-col justify-start items-start gap-4'>

            <div onClick={() => navigate(`/profile/${loggedInUserId}`)} className='flex gap-2 justify-start items-center pl-2'>
              <img className='w-[40px] rounded-full bg-teal-500 p-2' src={profile} alt="" srcSet="" />
              <p className='text-xl text-white'>Profile</p>
            </div>

            <div className='flex gap-2 justify-start items-center pl-2'>
              <img className='w-[40px] rounded-full bg-teal-500 p-2' src={post} alt="" srcSet="" />
              <p className='text-xl text-white'>Create Post</p>
            </div>

            <div className='flex gap-2 justify-start items-center pl-2'>
              <img className='w-[40px] rounded-full bg-teal-500 p-2' src={blog} alt="" srcSet="" />
              <p className='text-xl text-white'>Create Blog</p>
            </div>

            <div className='flex gap-2 justify-start items-center pl-2'>
              <img className='w-[40px] rounded-full bg-teal-500 p-2' src={pencil} alt="" srcSet="" />
              <p className='text-xl text-white'>Edit</p>
            </div>

            <div className='flex gap-2 justify-start items-center pl-2'>
              <img className='w-[40px] rounded-full bg-teal-500 p-2' src={setting} alt="" srcSet="" />
              <p className='text-xl text-white'>Setting</p>
            </div>

          </div>

          {/* UPGRADE PRO FEATURE */}
          <div className='w-full h-full flex flex-col justify-end items-center gap-2 pb-2'>

            <img className='w-[100px]' src={pc} alt="" srcSet="" />

            <b>Upgrade to Pro for more features</b>

            <span className='bg-teal-500 px-6 py-2'>Upgrade</span>

          </div>

        </div>

      </div>

      <div className={`w-[250px] md:w-[20%] h-[100vh] hidden md:flex flex-col justify-start items-start gap-5 bg-gray-500`}>

        {/* LOGO */}
        <div className='flex items-center gap-2'>
          <img className='w-[50px]' src={logo} alt="" />
          <h1 className='text-3xl text-white font-bold'>HireHub</h1>
        </div>

        {/* SEVERAL OPTOINS LIKE SETTING, PROFILE */}
        <div className='flex flex-col justify-start items-start gap-4'>

          <div onClick={() => navigate(`/profile/${loggedInUserId}`)} className='flex gap-2 justify-start items-center pl-2'>
            <img className='w-[40px] rounded-full bg-teal-500 p-2' src={profile} alt="" srcSet="" />
            <p className='text-xl text-white'>Profile</p>
          </div>

          <div onClick={() => navigate(`/postForm`)} className='flex gap-2 justify-start items-center pl-2'>
            <img className='w-[40px] rounded-full bg-teal-500 p-2' src={post} alt="" srcSet="" />
            <p className='text-xl text-white'>Create Post</p>
          </div>

          <div onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='flex gap-2 justify-start items-center pl-2'>
            <img className='w-[40px] rounded-full bg-teal-500 p-2' src={blog} alt="" srcSet="" />
            <p className='text-xl text-white'>Create Blog</p>
          </div>

          <div onClick={() => navigate("/profileForm")} className='flex gap-2 justify-start items-center pl-2'>
            <img className='w-[40px] rounded-full bg-teal-500 p-2' src={pencil} alt="" srcSet="" />
            <p className='text-xl text-white'>Edit</p>
          </div>

          <div className='flex gap-2 justify-start items-center pl-2'>
            <img className='w-[40px] rounded-full bg-teal-500 p-2' src={setting} alt="" srcSet="" />
            <p className='text-xl text-white'>Setting</p>
          </div>

        </div>

        {/* UPGRADE PRO FEATURE */}
        <div className='w-full h-full flex flex-col justify-end items-center gap-2 pb-2'>

          <img className='w-[100px]' src={pc} alt="" srcSet="" />

          <b>Upgrade to Pro for more features</b>

          <span className='bg-teal-500 px-6 py-2'>Upgrade</span>

        </div>

      </div>

      {/* RIGHT BOX */}
      <div className='w-[full] md:w-[80%] h-full bg-gray-800'>

        {/* NAMES,RIGHT IMAGE */}
        <div className='w-full h-fit md:h-[30%] flex flex-col md:flex-row justify-between bg-teal-200 gap-5 p-2'>

          <div className='flex flex-col h-full md:pt-10 md:pl-5'>
            <p className='text-3xl font-bold'>Hello Arya</p>
            <p>Ready to start your day with some pitch decks</p>
          </div>

          <div className='w-full flex justify-end'><img className='w-[100px] md:w-[300px]' src={bigImg6} alt="" /></div>

        </div>

        {/* HASH TAGS */}
        <div className='w-full h-[10%] bg-yellow-500 flex justify-evenly items-center gap-2'>

          {hashArr?.map((e, i) => (<span key={i} className='w-[100px] text-center bg-teal-500 px-2 py-1 rounded-md '>{e}</span>))}

        </div>

        {/* ALL POSTS */}
        <div className='w-full h-[60%] flex flex-wrap justify-center items-center gap-4 p-2 bg-teal-500 overflow-scroll'>
          {posts?.map((e) => (<Card key={e._id} card={e} />))}
        </div>

      </div>

      <img onClick={() => setToggle("left-[0vw]")} className='fixed bottom-[50px] right-[10px] block md:hidden w-[40px]' src={menu} alt="" srcSet="" />


    </div>
  )
}

export default Community
