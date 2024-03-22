import React, { useEffect, useState } from 'react'
import dp from "../../../assets/dp.svg"
import heart from "../../../assets/heart.svg"
import comment from "../../../assets/comment.svg"
import pencil from "../../../assets/pencil.svg"
import remove from "../../../assets/delete.svg";
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyPostAsync, getNotificationsAsync, handleRequestAsync, selectMyNotification, selectMyPosts, sendFriendRequestAsync } from '../../Community/communitySlice'
import { getOtherUserDetailAsync, selectLoggedInUser, selectOtherUserDetail, selectUserId } from '../../User/userSlice'
import Loader from '../../../Features/Loader'
import Card from '../../../Features/Card'
import { useParams } from 'react-router-dom'


const Profile = () => {

  const dispatch = useDispatch()
  const myPosts = useSelector(selectMyPosts)
  const paramUserIdDetails = useSelector(selectOtherUserDetail)
  const loggedInUserId = useSelector(selectUserId)
  const myNotifications = useSelector(selectMyNotification)
  const { userId: paramUserId } = useParams();

  useEffect(() => {

    dispatch(getOtherUserDetailAsync(paramUserId))
    dispatch(fetchMyPostAsync(paramUserId))

  }, [paramUserId])


  console.log(paramUserIdDetails);
  console.log(myPosts);
  console.log("--------------Notification--------------");
  console.log(myNotifications);

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
    <div className='w-full min-h-[100vh] flex flex-col py-[70px]'>

      {/* First Row */}
      {paramUserIdDetails ? <>

        <div className='w-full h-[30vh] flex flex-col md:flex-row items-center justify-between gap-2'>

          {/* PROFILE */}
          <div className='w-[30%] flex flex-col md:flex-row items-center justify-start gap-1'>

            <img className='w-[200px]' src={dp} alt="" srcSet="" />

            <div className='flex flex-col justify-center items-start gap-2'>

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

      </> : ""}

      {/* Second Row */}
      {paramUserIdDetails ? <>

        <div className='w-full min-h-[60vh] flex flex-wrap items-start justify-start gap-8 p-5'>

          {myPosts ? myPosts?.map((e, i) => (
            <div key={i}>
              <Card card={e} />

            </div>
          )) : <Loader />}

        </div>

      </> : ""}


      {/* THIRD ROW FOR NOTIFICATION */}
      <div className='p-2 flex flex-col justify-start items-start gap-4'>
        <h1 className='text-3xl'>Notification :</h1>
        {myNotifications?.length > 0 ? myNotifications?.map((e) => (
          <>
            {e.senderId.name && <div className='pl-5 flex flex-col items-start justify-start gap-2'>

              <p className='text-xl'>{e.senderId.name} send friend request</p>

              <div className='flex justify-between items-center gap-2'>

                <button onClick={() => handleFriendRequest("accept", e._id)} className='bg-teal-500 px-2 py-1'>Accept</button>
                <button onClick={() => handleFriendRequest("reject", e._id)} className='bg-teal-500 px-2 py-1'>Reject</button>

              </div>

            </div>}

          </>
        )) : "No Notification"}
      </div>

    </div>
  )
}

export default Profile