import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { selectUserId } from '../../Pages/User/userSlice'
import { selectPostDrawer, setLikeDrawer } from '../../Pages/Community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../../assets/dp.svg"
import heart from "../../assets/heart.svg"
import send from "../../assets/send2.svg"
import { addRemoveCommentAsync } from '../../Pages/Community/communitySlice'
import dayjs from "dayjs"
import { useNavigate } from 'react-router-dom'

const PostDrawer = () => {

    const dispatch = useDispatch()
    const postDrawer = useSelector(selectPostDrawer)
    const loggedInUserId = useSelector(selectUserId)
    const commentInputRef = useRef(null)
    const param = window.location.search
    console.log(param);

    // USED TO BRING POST PAGE ABOVE 
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState("hidden fixed top-[50vh] left-0")

    const navigate = useNavigate()

    // USED IN TRANSITION THE INCOMG POST PAGE WHEN WE CLICK ON POST IMAGE
    const handleTransition = useCallback(() => {

        console.log("SHOWING TANSITION");

        setToggle2("block opacity-[0.2] fixed top-[50vh] left-0")

        setTimeout(() => {
            setToggle2("block fixed top-[60px] left-0")
        }, 100);

        history.pushState({}, "", "")
        document.body.style.overflow = "hidden"

        console.log("ADDING ONE STATE IN HISTORY STACK -------");

    }, [])

    // BELOW FUNC TO REMOVE DRAWER WHEN EVER USER PRESS BACK BUTTON IN BROWSER
    const handleRemoveDrawer1 = () => {
        setToggle2("hidden fixed top-[50vh] left-0")
        document.body.style.overflow = "scroll"
    }

    const handleRemoveDrawer2 = () => {
        setToggle2("hidden fixed top-[50vh] left-0")
        document.body.style.overflow = "scroll"
        history.back();
    }

    const handleAddComment = () => {
        dispatch(addRemoveCommentAsync({ query: `purpose=add&type=comment&userId=${loggedInUserId}&postId=${postDrawer.data._id}&comment=${commentInputRef.current.value}` }))
        commentInputRef.current.value = "";
    }

    const handleShowLikes = () => {
        dispatch(setLikeDrawer({show:true,data:postDrawer?.data}))
    }

    const handleDeleteComment = (comment) => {
        dispatch(addRemoveCommentAsync({ query: `purpose=delete&type=comment&userId=${loggedInUserId}&postId=${commentDrawerData._id}&comment=${comment}` }))
    }

    const handleNavigate = (userId) => {

        handleRemoveDrawer2()

        setTimeout(() => {
            navigate(`/profile/${userId}`)
        }, 100);
        
    }

    // USED BELOW EVENT LISTENER TO REMOVE DRAWER WHEN EVER USER PRESS BACK BUTTON IN BROWSER
    useEffect(() => {

        window.addEventListener('popstate', handleRemoveDrawer1);

        return () => {
            window.removeEventListener('popstate', handleRemoveDrawer1);
        }

    }, [])

    useEffect(() => {

        if (postDrawer?.show == true) {
            if (toggle2 == "hidden fixed top-[50vh] left-0") {
                handleTransition()
            }
        } else {
            handleRemoveDrawer1()
        }

    }, [postDrawer])

    console.log(postDrawer);



    return (
        <>

            {postDrawer?.data &&

                <div onClick={handleRemoveDrawer2} className={`w-full h-dvh lg:h-dvh bg-gradient-to-r from-black flex flex-col md:flex-row md:items-center md:justify-center transition-all duration-500 ${toggle2} z-50`}>

                    {/* POST PIC */}
                    <div className='w-full 2xl:w-[50%] h-fit md:h-[50%] 2xl:h-full bg-transparent flex items-center justify-center'>
                        <img onClick={e => e.stopPropagation()} className='w-full md:w-[550px] 2xl:w-[90%]' src={postDrawer.data.picUrl} alt="" srcSet="" />
                    </div>

                    {/* COMMENTS */}
                    <div className='w-full 2xl:w-[50%] h-[100%] md:h-[50%] 2xl:h-full flex flex-col justify-center overflow-y-scroll'>

                        <div onClick={e => e.stopPropagation()} className='w-full 2xl:w-[80%] h-full 2xl:h-[80%] bg-white flex flex-col justify-start items-start relative'>

                            {/* USER NAME, POST DATE AND DP  */}
                            <div className='w-full text-center text-2xl flex items-center justify-between gap-5 bg-teal-400'>

                                <div className='flex items-center gap-1'>

                                    <img className='w-[50px] h-[50px] rounded-full' src={postDrawer.data.userId.profilePic} alt="" srcSet="" />

                                    <div className='flex flex-col items-start justify-start cursor-pointer'>

                                        <p onClick={() => handleNavigate(postDrawer.data.userId._id)}>{postDrawer.data.userId.name}</p>

                                        <p className='text-[14px]'>{dayjs(postDrawer.data.createdAt).format("YYYY-MM-DD HH:MM")}</p>

                                    </div>

                                </div>

                                <img className='cursor-pointer' onClick={handleShowLikes} src={heart} alt="" srcSet="" />

                            </div>

                            {/* COMMENTS */}
                            <div className='w-full flex flex-col pl-2 pb-[46px] h-[100%] overflow-y-scroll'>
                                {postDrawer?.data.comments.length > 0 ? postDrawer?.data.comments.map((e) => (

                                    <div key={e._id} className='flex flex-col gap-1'>

                                        <div className='flex items-center text-xl cursor-pointer'>
                                            <img className='w-[35px]' src={dp} alt="" srcSet="" />
                                            <p onClick={() => handleNavigate(e.userId._id)}>{e.userId.name}</p>
                                        </div>

                                        <p className='text-teal-500 text-1xl pl-10'>{e.comment}</p>

                                    </div>

                                )) : "NO COMMENTS"}
                            </div>

                            {/* INPUT */}
                            <div className='absolute bottom-[106px] md:bottom-0 left-0 w-full flex items-center justify-start border-2 border-gray-300'>

                                <input ref={commentInputRef} className='w-[95%] bg-white' placeholder='Comment...' type="text" />

                                <img onClick={handleAddComment} className='w-[30px] cursor-pointer' src={send} alt="" srcSet="" />

                            </div>

                        </div>  

                    </div>

                </div>


            }

        </>
    )
}

export default memo(PostDrawer)
