import React, { useEffect, useState } from 'react'
import dp from "../../../assets/dp.svg"
import heart from "../../../assets/heart.svg"
import comment from "../../../assets/comment.svg"
import pencil from "../../../assets/pencil.svg"
import remove from "../../../assets/delete.svg";
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyPostAsync, selectMyPosts } from '../../Community/communitySlice'
import { selectLoginUser, selectUserId } from '../../User/userSlice'
import Loader from '../../../Features/Loader'
import Card from '../../../Features/Card'


const Profile = () => {


  const dispatch = useDispatch()
  const myPosts = useSelector(selectMyPosts)
  const userId = useSelector(selectUserId)
  const userDetails = useSelector(selectLoginUser)
  console.log(userDetails);

  useEffect(() => {
    dispatch(fetchMyPostAsync(userId))
  }, [])


  return (
    <div className='w-full min-h-[100vh] flex flex-col py-[70px]'>

      {/* First Row */}
      <div className='w-full h-[30vh] flex flex-col md:flex-row items-center justify-between gap-2'>

        <div className='w-[30%] flex flex-col md:flex-row items-center justify-start gap-1'>

          <img className='w-[200px]' src={dp} alt="" srcSet="" />

          <div className='flex flex-col justify-center items-start gap-2'>

            <p className='text-3xl'>{userDetails.name}</p>
            <p className='text-2xl'>{userDetails.email}</p>

          </div>

        </div>

        <div className='w-[100%] lg:w-[60%] flex items-center justify-evenly'>

          <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='text-1xl lg:text-3xl'>Posts</p>
            <p className='text-1xl lg:text-3xl'>23</p>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='text-1xl lg:text-3xl'>Likes</p>
            <p className='text-1xl lg:text-3xl'>23</p>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='text-1xl lg:text-3xl'>Friends</p>
            <p className='text-1xl lg:text-3xl'>23</p>
          </div>

        </div>

      </div>

      {/* Second Row */}
      <div className='w-full min-h-[60vh] flex flex-wrap items-start justify-start gap-8 p-5'>

        {myPosts ? myPosts?.map((e, i) => (
          <div key={i}>
            <Card card={e} />

          </div>
        )) : <Loader />}

      </div>

    </div>
  )
}

export default Profile
