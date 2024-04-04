import React, { useEffect, useState } from 'react'
import logo from "../../../assets/logo.svg"
import bigImg6 from "../../../assets/bigImg6.svg"
import pc from "../../../assets/pc.svg"
import post from "../../../assets/post.svg"
import blog from "../../../assets/blog.svg"
import setting from "../../../assets/setting.svg"
import profile from "../../../assets/customer1.svg"
import pencil from "../../../assets/pencil.svg"
import search from "../../../assets/search.svg"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostAsync, selectUserPosts } from '../communitySlice'
import Card from '../../../Features/Card'
import { selectLoggedInUser, selectUserId } from '../../User/userSlice'
import { useNavigate } from 'react-router-dom'
import { getAllBlogAsync, selectBlogs, setBlogDrawer } from '../../Blogs/blogsSlice'
import Search from '../../Search/component/Search'
import Blogs from '../../Blogs/Blogs'

const Community = () => {

  const [toggle, setToggle] = useState("-left-[100vw]")
  const [showSearch, setShowSearch] = useState(null)

  const dispatch = useDispatch()
  const posts = useSelector(selectUserPosts)
  const loggedInUserId = useSelector(selectUserId)
  const blogs = useSelector(selectBlogs)
  const loggedInUser = useSelector(selectLoggedInUser)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPostAsync("page=0"));
    dispatch(getAllBlogAsync())
  }, [])

  const leftBox = () => (
    <>

      {/* SEVERAL OPTOINS LIKE SETTING, PROFILE */}
      <div className='flex flex-col justify-start items-start gap-4'>

        <div onClick={() => navigate(`/profile/${loggedInUserId}`)} className='flex gap-2 justify-start items-center pl-2'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-500 p-2' src={profile} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Profile</p>
        </div>

        <div onClick={() => navigate(`/postForm`)} className='flex gap-2 justify-start items-center pl-2'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-500 p-2' src={post} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Create Post</p>
        </div>

        <div onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='flex gap-2 justify-start items-center pl-2'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-500 p-2' src={blog} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Create Blog</p>
        </div>

        <div onClick={() => navigate("/profileForm")} className='flex gap-2 justify-start items-center pl-2'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-500 p-2' src={pencil} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Edit</p>
        </div>

        <div className='flex gap-2 justify-start items-center pl-2'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-500 p-2' src={setting} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Setting</p>
        </div>

      </div>

      {/* UPGRADE PRO FEATURE */}
      <div className='w-full h-full flex flex-col justify-end items-center gap-2 px-5 py-2'>

        <img className='w-[100px]' src={pc} alt="" srcSet="" />

        <b className='w-full text-center capitalize'>Upgrade to Pro for more features</b>

        <span className='bg-teal-500 px-6 py-1 rounded-lg'>Upgrade</span>

      </div>
    </>
  )

  return (
    <div className='w-full h-[calc(100vh-70px)] flex flex-col md:flex-row overflow-scroll mt-[70px]'>

      {/* LEFT BOX MOBILE RESPONSIVE*/}
      <div onClick={() => setToggle("-left-[100vw]")} className={`w-full h-[100vh] fixed top-0 ${toggle} bg-gradient-to-t from-black transition-all duration-700 z-[1]`}>

        <div onClick={(e) => e.stopPropagation()} className={`w-[180px] md:w-[20%] h-[calc(100vh-106px)] flex flex-col mt-[60px] bg-teal-900 py-4`}>

          {leftBox()}

        </div>

      </div>

      {/* LEFT BOX */}
      <div className={`w-[250px] md:w-[20%] h-[calc(100vh-70px)] hidden md:flex flex-col justify-start items-start gap-5 bg-gray-500 pt-6`}>

        {leftBox()}

      </div>

      {/* RIGHT BOX */}
      <div className='w-[full] md:w-[80%] flex flex-col gap-2 p-2 overflow-scroll'>

        {/* HEADING */}
        <div className='w-full flex md:hidden flex-col items-center gap-4 p-2'>
          {/* COMMUNITY HEADING AND SETTING ICON */}
          <div className='w-full flex gap-2 items-center justify-between'>
            <h2 className='font-semibold text-2xl'>Community</h2>
            <img onClick={() => setToggle("left-[0vw]")} className='w-[20px] bg-black p-1 rounded-2xl' src={setting} alt="" srcSet="" />
          </div>
          {/* SEARCH */}
          <div className='w-full flex border-2 border-teal-500 rounded-2xl'>
            <img className='w-[30px] p-1' src={search} alt="" srcSet="" />
            <input onFocus={() => setShowSearch(true)} className='w-full' placeholder='Search Friend...' type="text" />
          </div>

        </div>

        {/* NAMES,RIGHT IMAGE */}
        <div className='w-full h-[120px] md:h-[30%] flex flex-col md:flex-row justify-between md:gap-5 p-2 bg-gray-400 rounded-2xl relative'>

          <div className='flex flex-col h-full'>
            <p className='text-xl md:text-4xl font-bold'>Hello {loggedInUser.name}</p>
            <p className='text-[14px] md:text-xl'>Start your day with some highlights</p>
            <p onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='w-[50px] bg-teal-500 rounded-lg p-1 text-center text-white mt-1'>Add</p>
          </div>

          <div className='absolute right-3 bottom-0 flex justify-end'><img className='w-[100px] md:w-[200px]' src={bigImg6} alt="" /></div>

        </div>

        {/* BLOGS */}
        <div className='w-full flex gap-2 overflow-x-scroll'>

          {blogs?.map((e) => (<div key={e._id}><Blogs blog={e} /></div>))}

        </div>

        {/* ALL POSTS */}
        <div className='w-full h-[30%] flex flex-wrap justify-center md:justify-start items-center gap-4'>
          {posts?.map((e) => (<Card key={e._id} card={e} />))}
        </div>

      </div>

      {showSearch && <Search type='user' hide={setShowSearch} />}


    </div>
  )
}

export default Community
