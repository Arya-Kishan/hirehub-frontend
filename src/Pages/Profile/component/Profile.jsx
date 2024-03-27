import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import dp from "../../../assets/dp.svg"
import pencil from "../../../assets/pencil.svg"
import remove from "../../../assets/delete.svg"
import add from "../../../assets/add.svg"
import cross from "../../../assets/cross.svg"
import threeDot1 from "../../../assets/threeDot1.svg"


import { fetchMyPostAsync, getNotificationsAsync, selectMyPosts, sendFriendRequestAsync } from '../../Community/communitySlice'
import { getOtherUserDetailAsync, selectOtherUserDetail, selectUserId } from '../../User/userSlice'

import Loader from '../../../Features/Loader'
import Card from '../../../Features/Card'
import { addBlogAsync, setBlogDrawer } from '../../Blogs/blogsSlice'


const Profile = () => {

  const [toggle, setToggle] = useState(200)
  const [toggle2, setToggle2] = useState(0)

  const dispatch = useDispatch()
  const myPosts = useSelector(selectMyPosts)
  const paramUserIdDetails = useSelector(selectOtherUserDetail)
  const loggedInUserId = useSelector(selectUserId)
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {

    dispatch(getOtherUserDetailAsync(paramUserId))
    dispatch(fetchMyPostAsync(paramUserId))

  }, [paramUserId])

  const handleGetTotalLikes = () => {
    let count = 0;
    myPosts?.forEach(element => {
      element.likes.forEach((e) => {
        count++;
      })
    });
    console.log(count);
    return count;
  }

  const handleSentRequest = (senderId) => {
    console.log(senderId);
    const formData = new FormData()
    formData.append("senderId", loggedInUserId)
    formData.append("receiverId", senderId)
    dispatch(sendFriendRequestAsync(formData));

  }

  useEffect(() => {
    if (paramUserId == loggedInUserId) {
      dispatch(getNotificationsAsync(loggedInUserId))
    }
  }, [])

  // console.log(paramUserIdDetails);
  console.log(myPosts);



  return (
    <div className='w-full min-h-[100vh] flex flex-col py-[70px] relative overflow-hidden'>

      {paramUserIdDetails && myPosts ?
        <>
          {/* First Row */}
          <div className='w-full min-h-[30vh] flex flex-col md:flex-row items-center justify-between gap-2'>

            {/* PROFILE */}
            <div className='w-[30%] flex flex-col md:flex-row items-center justify-start gap-1'>

              <img className='w-[200px]' src={dp} alt="" srcSet="" />

              <div className='flex flex-col justify-center items-center md:items-start gap-2'>

                <p className='text-3xl'>{paramUserIdDetails.name}</p>
                <p className='text-xl'>{paramUserIdDetails.email}</p>
                {paramUserIdDetails._id !== loggedInUserId ? <p className='text-xl bg-teal-500 px-2 py-1 text-white cursor-pointer'>{paramUserIdDetails.friends.includes(loggedInUserId) ? "Friend's" : <span onClick={() => handleSentRequest(paramUserIdDetails._id)}>Connect</span>}</p> : ""}

              </div>

            </div>

            {/* FOLLWERS POSTS */}
            <div className='w-[100%] lg:w-[60%] flex items-center justify-evenly'>

              <div className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                <p className='text-1xl lg:text-3xl'>Posts</p>
                <p className='text-1xl lg:text-3xl'>{myPosts?.length}</p>
              </div>

              <div className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                <p className='text-1xl lg:text-3xl'>Likes</p>
                <p className='text-1xl lg:text-3xl'>{handleGetTotalLikes()}</p>
              </div>

              <div className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                <p className='text-1xl lg:text-3xl'>Friends</p>
                <p className='text-1xl lg:text-3xl'>{paramUserIdDetails.friends.length}</p>
              </div>

            </div>

          </div>

          {/* Second Row */}
          <div className='w-full min-h-[60vh] flex flex-wrap items-start justify-center md:justify-start gap-8 p-5'>

            {paramUserIdDetails.friends.includes(loggedInUserId) || (paramUserId == loggedInUserId) ? myPosts.map((e, i) => (
              <div key={i}>
                <Card card={e} />
              </div>
            )) : <div className='w-full h-[60vh] flex justify-center items-center'>YOU ARE NOT FRIEND</div>}

          </div>
        </>
        : <Loader />}

      <div onClick={() => setToggle(0)} className='absolute top-[60px] right-2 rotate-90 cursor-pointer'><img className='w-[20px]' src={threeDot1} alt="" srcset="" /></div>

      {/* CREATE DELETE UPDATE POST QACCOUNT OPITONS */}
      <div className={`absolute top-[200px] -right-[${toggle}px] bg-teal-500 transition-all duration-700 cursor-pointer`}>

        <div onClick={()=>navigate(`/postForm`)} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
          <span>Create Post</span>
          <img className='w-[20px]' src={add} alt="" srcset="" />
        </div>

        <div onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
          <span>Create Blog</span>
          <img className='w-[20px]' src={add} alt="" srcset="" />
        </div>

        <div className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
          <span>Update Profile</span>
          <img className='w-[20px]' src={pencil} alt="" srcset="" />
        </div>

        <div className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
          <span>Delete Account</span>
          <img className='w-[20px]' src={remove} alt="" srcset="" />
        </div>

        <div onClick={() => setToggle(200)} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between text-white'>
          <span>Cancel</span>
          <img className='w-[20px]' src={cross} alt="" srcset="" />
        </div>

      </div>


    </div>
  )
}

export default memo(Profile)