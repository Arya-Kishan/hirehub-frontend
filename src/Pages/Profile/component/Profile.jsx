import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import dp from "../../../assets/dp.svg"
import pencil from "../../../assets/pencil.svg"
import remove from "../../../assets/delete.svg"
import add from "../../../assets/add.svg"
import cross from "../../../assets/cross.svg"
import instagram from "../../../assets/instagram.svg"
import twitter from "../../../assets/twitter.svg"
import linkedIn from "../../../assets/linkedIn.svg"
import threeDot1 from "../../../assets/threeDot1.svg"


import { fetchMyPostAsync, getNotificationsAsync, selectMyPosts, sendFriendRequestAsync } from '../../Community/communitySlice'
import { getOtherUserDetailAsync, selectOtherUserDetail, selectUserId } from '../../User/userSlice'

import Loader from '../../../Features/Loader'
import Card from '../../../Features/Card'
import { getMyBlogAsync, selectMyBlogs, setBlogDrawer } from '../../Blogs/blogsSlice'
import Blogs from '../../Blogs/Blogs'
import { getApplicationAsync, selectApplications } from '../../Application/applicationSlice'


const Profile = () => {

  const [toggle, setToggle] = useState("-right-[100vw]")
  const [toggle2, setToggle2] = useState("-right-[100%]")
  const [toggle3, setToggle3] = useState("-bottom-[50%]")
  const [detail, setDetail] = useState({ type: "posts", data: null })

  const dispatch = useDispatch()
  const myPosts = useSelector(selectMyPosts)
  const paramUserIdDetails = useSelector(selectOtherUserDetail)
  const loggedInUserId = useSelector(selectUserId)
  const myBlogs = useSelector(selectMyBlogs)
  const myApplications = useSelector(selectApplications);
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate()

  const fetchUserBlogs = useCallback((userId) => {
    dispatch(getMyBlogAsync(userId))
    setDetail({ type: "blogs", data: null })
  }, [])

  const fetchUserApplications = useCallback((userId) => {
    dispatch(getApplicationAsync({ id: userId, query: "applicantId" }));
    setDetail({ type: "applications", data: null })
  }, [])

  const fetchUserPost = useCallback((userId) => {
    setDetail({ type: "posts", data: myPosts })
  }, [detail])


  const handleGetTotalLikes = useCallback(() => {
    let count = 0;
    myPosts?.forEach(element => {
      element.likes.forEach((e) => {
        count++;
      })
    });
    console.log(count);
    return count;
  }, [myPosts])

  const handleSentRequest = (senderId) => {
    const formData = new FormData()
    formData.append("senderId", loggedInUserId)
    formData.append("receiverId", senderId)
    dispatch(sendFriendRequestAsync(formData));
  }

  function friendsArr() {
    return paramUserIdDetails.friends.map((e) => e._id)
  };

  /* DISPATCH FOR GETTING NOTIFICATION */
  useEffect(() => {
    if (paramUserId == loggedInUserId) {
      dispatch(getNotificationsAsync(loggedInUserId))
    }
  }, [])

  useEffect(() => {

    if (detail.type == "posts") {
      setDetail({ type: "posts", data: myPosts })
    } else if (detail.type == "blogs") {
      setDetail({ type: "blogs", data: myBlogs })
    } else if (detail.type == "applications") {
      setDetail({ type: "applications", data: myApplications })
    }

  }, [myPosts, myBlogs, myApplications])

  useEffect(() => {
    dispatch(getOtherUserDetailAsync(paramUserId))
    setDetail({ type: "posts", data: null })
    dispatch(fetchMyPostAsync(paramUserId))
  }, [paramUserId])

  console.log(paramUserIdDetails);
  // console.log(myPosts);
  // console.log(myBlogs);
  // console.log(myApplications);
  // console.log(detail);

  console.log("---------PROFILE---------");



  return (
    <div className='w-full min-h-[100vh] flex flex-col py-[70px] overflow-hidden'>

      {paramUserIdDetails && myPosts ?
        <div className='flex flex-col md:flex-row items-center justify-center gap-5'>

          {/* First Row */}
          <div className='w-full md:w-[25%] h-fit md:h-[80vh] flex flex-col items-center justify-between gap-2 relative overflow-hidden shadow-none md:shadow-lg md:shadow-black'>

            {/* PROFILE PIC, NAME, BIO */}
            <div className='w-full flex flex-col items-center justify-center gap-1 z-[8]'>

              <img className='w-[200px] rounded-full' src={paramUserIdDetails.profilePic} alt="" srcSet="" />

              <div className='w-full flex flex-col justify-center items-center md:items-start gap-2'>

                <p className='w-full text-3xl text-center'>{paramUserIdDetails.name}</p>
                <p className='w-full text-xl text-center'>{paramUserIdDetails.bio}</p>

              </div>

            </div>

            {/* POST COUNT, LIKES COUNT, FRINEDS COUNT */}
            <div className='w-full h-[100px] flex items-center justify-evenly gap-4'>

              <div className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                <p className='text-1xl lg:text-3xl'>Posts</p>
                <p className='text-1xl lg:text-3xl'>{myPosts?.length}</p>
              </div>

              <div className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                <p className='text-1xl lg:text-3xl'>Likes</p>
                <p className='text-1xl lg:text-3xl'>{handleGetTotalLikes()}</p>
              </div>

              <div onClick={() => setToggle3("-bottom-[0%]")} className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                <p className='text-1xl lg:text-3xl'>Friends</p>
                <p className='text-1xl lg:text-3xl'>{friendsArr().length}</p>
              </div>

            </div>

            {/* MORE & CONNECT */}
            <div className='w-full flex justify-evenly items-center gap-5 my-4'>

              <button onClick={() => setToggle("right-[0px]")} className='w-[100px] text-white bg-teal-500 px-4 py-1 rounded-lg shadow-lg'>More</button>

              {paramUserIdDetails._id !== loggedInUserId ? <p className='w-[100px] text-center border-2 border-teal-500 px-2 py-1 text-teal-500 cursor-pointer rounded-lg shadow-lg'>{friendsArr().includes(loggedInUserId) ? "Friend" : <span onClick={() => handleSentRequest(paramUserIdDetails._id)}>Connect</span>}</p> : ""}

            </div>

            <div className='w-[450px] h-[450px] rounded-full bg-teal-500 absolute top-[5%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[5]'></div>

            <div className={`w-full h-[50%] absolute ${toggle3} left-0 bg-teal-500 rounded-lg flex flex-col justify-start items-center transition-all duration-700 z-30`}>

              <div className='w-full flex justify-end p-2'>
                <img className='w-[30px]' onClick={() => setToggle3("-bottom-[50%]")} src={cross} alt="" srcset="" />
              </div>

              {paramUserIdDetails.friends.map((e) => (
                <div onClick={() => {
                  navigate(`/profile/${e._id}`)
                  setToggle3("-bottom-[50%]")
                }} className='w-full flex items-center text-white justify-start mt-1 overflow-scroll'>
                  <img className='w-[40px]' src={dp} alt="" srcset="" />
                  <p>{e.name}</p>
                </div>
              ))}

            </div>

          </div>

          {/* SECOND Row */}
          <div className='w-full md:w-[65%] min-h-[80vh] md:h-[80vh] flex flex-col shadow-none md:shadow-lg md:shadow-black'>

            {/* MY SAVED,POST,MY BLOGS SELECT BUTTON LITTLE NAVBAR */}
            <div className='w-full h-[5vh] md:h-[5vh] bg-teal-500 flex items-center justify-around'>
              <p onClick={() => fetchUserPost(paramUserIdDetails._id)} className={`w-full h-full flex justify-center items-center ${detail.type == "posts" ? "text-white bg-teal-800" : "text-black"}`}>POST</p>
              <p onClick={() => fetchUserBlogs(paramUserIdDetails._id)} className={`w-full h-full flex justify-center items-center ${detail.type == "blogs" ? "text-white bg-teal-800" : "text-black"}`}>BLOGS</p>
              <p onClick={() => fetchUserApplications(paramUserIdDetails._id)} className={`w-full h-full flex justify-center items-center ${detail.type == "applications" ? "text-white bg-teal-800" : "text-black"}`}>APPLICATION</p>
            </div>

            {/* ALL POSTS */}
            <div className='w-full h-fit md:h-[80vh] overflow-scroll flex flex-wrap items-start justify-center md:justify-start gap-8 p-5'>

              {friendsArr().includes(loggedInUserId) || (paramUserId == loggedInUserId) ? detail?.data?.length > 0 ?

                detail?.data?.map((e, i) => (
                  <div key={i}>

                    {
                      detail.type == "posts" &&
                      <Card card={e} />
                    }

                    {
                      detail.type == "blogs" &&
                      <Blogs blog={e} />
                    }

                    {
                      detail.type == "applications" &&
                      <div className='w-[90%] lg:w-[60%] flex flex-col md:flex-row justify-between items-center gap-20 py-10 px-4 shadow-lg'>

                        <div className='flex flex-col items-start justify-center gap-4'>

                          <p><b>Name : </b>{e.name}</p>
                          <p><b>Email : </b>{e.email}</p>
                          <p><b>Phone : </b>{e.phone}</p>
                          <p><b>Address : </b>{e.address}</p>
                          <p><b>Cover Letter : </b>{e.coverLetter}</p>

                        </div>

                        <div onClick={() => navigate("/application")} className='flex items-center justify-center bg-teal-600'>
                          <img className='w-[200px]' src={e.resume} alt="" srcSet="" />
                        </div>

                      </div>
                    }

                  </div>
                ))

                : <div className='w-full h-[60vh] flex justify-center items-center uppercase'>NO {detail.type}</div> : <div className='w-full h-[60vh] flex justify-center items-center'>YOU ARE NOT FRIEND</div>}

            </div>

          </div>

        </div>
        : <Loader />

      }



      {/* FIXED POSTION : THREE DOT BUTTON */}
      <div onClick={() => setToggle("right-[0]")} className='fixed top-[80px] right-2 rotate-90 cursor-pointer z-[8]'><img className='w-[20px]' src={threeDot1} alt="" srcSet="" /></div>



      {/* FIXED POSTION : CREATE, DELETE, UPDATE, POST, ACCOUNT OPITONS */}
      <div onClick={() => setToggle("-right-[100vw]")} className={`fixed top-0 ${toggle} w-full h-[100vh] transition-all duration-700 z-20`}>

        <div onClick={e => e.stopPropagation()} className={`absolute top-[30%] right-0 bg-teal-500 transition-all duration-700 cursor-pointer`}>

          {loggedInUserId == paramUserId && <>
            <div onClick={() => navigate(`/postForm`)} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
              <span>Create Post</span>
              <img className='w-[20px]' src={add} alt="" srcSet="" />
            </div>

            <div onClick={() => dispatch(setBlogDrawer({ show: true, data: "" }))} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
              <span>Create Blog</span>
              <img className='w-[20px]' src={add} alt="" srcSet="" />
            </div>

            <div onClick={() => navigate("/profileForm")} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
              <span>Update Profile</span>
              <img className='w-[20px]' src={pencil} alt="" srcSet="" />
            </div>

            <div className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
              <span>Delete Account</span>
              <img className='w-[20px]' src={remove} alt="" srcSet="" />
            </div>
          </>}

          <div onClick={() => {
            setToggle2("right-0")
            setToggle("-right-[100vw]")
          }} className='text-xl font-semibold p-2 flex items-center gap-1 w-[200px] justify-between'>
            <span>More Detail</span>
            <img className='w-[20px]' src={remove} alt="" srcSet="" />
          </div>

        </div>

      </div>

      {/* FIXED POSITION : MORE DETAILS OF USER */}
      {paramUserIdDetails &&
        <div onClick={() => setToggle2("-right-[100vw]")} className={`fixed top-0 ${toggle2} w-full h-[100vh] flex justify-end items-end transition-all duration-700`}>

          <div onClick={e => e.stopPropagation()} className='w-[300px] h-[50vh] bg-white flex flex-col justify-start items-center gap-4'>

            <img src={paramUserIdDetails.bannerImg} alt="" srcSet="" />

            <p>Email : {paramUserIdDetails.email}</p>

            <p>Phone : {paramUserIdDetails.phone}</p>

            <p className='w-[90%]'>Location
              : {paramUserIdDetails.location}</p>

            <div className='flex gap-4'>
              {paramUserIdDetails.interest.map((e, i) => (<span key={i} className='px-4 py-1 bg-yellow-500 rounded-lg'>{e}</span>))}
            </div>

            <div className='flex'>
              <a href={`${paramUserIdDetails?.socials[0]?.instagram}`}><img className='w-[40px]' src={instagram} alt="" srcSet="" /></a>
              <a href={`${paramUserIdDetails?.socials[1]?.linkedIn}`}><img className='w-[40px]' src={linkedIn} alt="" srcSet="" /></a>
              <a href={`${paramUserIdDetails?.socials[2]?.twitter}`}><img className='w-[40px]' src={twitter} alt="" srcSet="" /></a>
            </div>

          </div>

        </div>}


    </div>
  )
}

export default memo(Profile)