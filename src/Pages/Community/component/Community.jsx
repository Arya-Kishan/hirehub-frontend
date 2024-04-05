import React, { useEffect, useState } from 'react'
import logo from "../../../assets/logo.svg"
import bigImg6 from "../../../assets/bigImg6.svg"
import pc from "../../../assets/pc.svg"
import post from "../../../assets/post.svg"
import blog from "../../../assets/blog.svg"
import setting from "../../../assets/setting.svg"
import menu from "../../../assets/menu.svg"
import profile from "../../../assets/customer1.svg"
import pencil from "../../../assets/pencil.svg"
import search from "../../../assets/search.svg"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostAsync, selectUserPosts } from '../communitySlice'
import Card from '../../../Features/Card'
import { selectLoggedInUser, selectUserId } from '../../User/userSlice'
import { useNavigate } from 'react-router-dom'
import { setBlogDrawer } from '../../Blogs/blogsSlice'
import Search from '../../Search/component/Search'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../../Features/Loader'

let count = 0;
const Community = () => {

  const [toggle, setToggle] = useState("-left-[100vw]")
  const [showSearch, setShowSearch] = useState(null)
  const [data, setData] = useState([])

  const dispatch = useDispatch()
  const posts = useSelector(selectUserPosts)
  const loggedInUserId = useSelector(selectUserId)
  const loggedInUser = useSelector(selectLoggedInUser)

  const navigate = useNavigate()

  const fetchNextData = () => {
    count++;
    console.log("FETCHING NEXT DATA");
    console.log(count);
    dispatch(fetchPostAsync(`page=${count}`));
  }

  useEffect(() => {
    dispatch(fetchPostAsync("page=0"));
  }, [])

  useEffect(() => {

    if (posts && count >= 1) {
      setData([...data, ...posts])
    } else {
      setData(posts)
    }

  }, [posts])

  const leftBox = () => (
    <>

      {/* SEVERAL OPTOINS LIKE SETTING, PROFILE */}
      <div className='flex flex-col justify-start items-start gap-4 px-'>

        <div onClick={() => navigate(`/profile/${loggedInUserId}`)} className='w-full flex gap-2 justify-start items-center p-2 cursor-pointer hover:bg-teal-400'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-400 p-2' src={profile} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Profile</p>
        </div>

        <div onClick={()=>navigate("/blogs")} className='w-full flex gap-2 justify-start items-center p-2 cursor-pointer hover:bg-teal-400'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-400 p-2' src={setting} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Blogs</p>
        </div>

        <div onClick={() => navigate(`/postForm`)} className='w-full flex gap-2 justify-start items-center p-2 cursor-pointer hover:bg-teal-400'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-400 p-2' src={post} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Create Post</p>
        </div>

        <div onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='w-full flex gap-2 justify-start items-center p-2 cursor-pointer hover:bg-teal-400'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-400 p-2' src={blog} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Create Blog</p>
        </div>

        <div onClick={() => navigate("/profileForm")} className='w-full flex gap-2 justify-start items-center p-2 cursor-pointer hover:bg-teal-400'>
          <img className='w-[35px] md:w-[50px] rounded-full bg-teal-400 p-2' src={pencil} alt="" srcSet="" />
          <p className='text-1xl md:text-xl text-white'>Edit</p>
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
      <div className={`w-[250px] md:w-[20%] h-[calc(100vh-70px)] hidden md:flex flex-col justify-start items-start gap-5 bg-teal-500 pt-6`}>

        {leftBox()}

      </div>

      {/* RIGHT BOX */}
      <div id='scrollableDiv' className='w-[full] md:w-[80%] flex flex-col gap-2 p-2 overflow-scroll'>

        {/* HEADING */}
        <div className='w-full flex flex-col items-center gap-4 p-2'>

          {/* COMMUNITY HEADING AND SETTING ICON */}
          <div className='w-full flex gap-2 items-center justify-between'>

            <h2 className='font-bold text-3xl md:text-4xl'>Community</h2>

            <img onClick={() => setToggle("left-[0vw]")} className='w-[35px] h-[35px] bg-teal-500 p-2 rounded-full' src={menu} alt="" srcSet="" />

          </div>

          {/* SEARCH */}
          <div className='w-full flex border-2 border-teal-500 rounded-2xl'>

            <img className='w-[30px] p-1' src={search} alt="" srcSet="" />

            <input onFocus={() => setShowSearch(true)} className='w-full' placeholder='Search Friend...' type="text" />

          </div>

        </div>

        {/* NAMES,RIGHT IMAGE */}
        <div className='w-full h-[120px] md:h-[30%] flex flex-col md:flex-row justify-between md:gap-5 p-2 bg-teal-500 rounded-2xl relative'>

          <div className='flex flex-col h-full'>
            <p className='text-xl md:text-4xl font-bold'>Hello {loggedInUser.name}</p>
            <p className='text-[13px] md:text-xl'>Start your day with some highlights</p>
            <p onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='w-[100px] md:w-[200px] bg-black rounded-lg p-1 text-center text-white mt-4'>Add</p>
          </div>

          <div className='absolute right-3 bottom-0 flex justify-end'><img className='w-[100px] md:w-[200px]' src={bigImg6} alt="" /></div>

        </div>

        {/* ALL POSTS */}
        <InfiniteScroll
          dataLength={count * 10} //This is important field to render the next data
          next={fetchNextData}
          hasMore={data?.length < Number(localStorage.getItem("x-total-post"))}
          loader={<Loader />}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className='w-full text-center'>
              <b>Yay! You have seen it all</b>
            </p>
          }
          className='w-full h-[30%] flex flex-wrap justify-center md:justify-start items-center gap-4'
        >
          {data?.length > 0 ? data?.map((e) => (<Card key={e._id} card={e} />)) : <Loader />}
        </InfiniteScroll>

      </div>

      {showSearch && <Search type='user' hide={setShowSearch} />}


    </div>
  )
}

export default Community
