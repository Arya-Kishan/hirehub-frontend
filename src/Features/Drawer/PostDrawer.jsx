import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { selectUserId } from '../../Pages/User/userSlice'
import { selectPostDrawer, setLikeDrawer, setLikeDrawerData } from '../../Pages/Community/communitySlice'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../../assets/dp.svg"
import heart from "../../assets/heart.svg"
import send from "../../assets/send2.svg"
import { addRemoveCommentAsync } from '../../Pages/Community/communitySlice'
import dayjs from "dayjs"

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

    // USED IN TRANSITION THE INCOMG POST PAGE WHEN WE CLICK ON POST IMAGE
    const handleTransition = useCallback(() => {

        setToggle2("block opacity-[0.2] fixed top-[50vh] left-0")

        setTimeout(() => {
            setToggle2("block fixed top-[5vh] left-0")
        }, 100);

        history.pushState({}, "", "")
        document.body.style.overflow = "hidden"

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
    }

    const handleShowLikes = () => {
        dispatch(setLikeDrawer(true))
        dispatch(setLikeDrawerData(postDrawer?.data))
    }

    const handleDeleteComment = (comment) => {
        dispatch(addRemoveCommentAsync({ query: `purpose=delete&type=comment&userId=${loggedInUserId}&postId=${commentDrawerData._id}&comment=${comment}` }))
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



    return (
        <>

            <div onClick={handleRemoveDrawer2} className={`w-full h-[100vh] bg-gradient-to-r from-black flex md:flex-col flex-wrap items-center justify-center transition-all duration-500 ${toggle2} z-8`}>

                {postDrawer?.data &&

                    <>

                        {/* PORT PIC */}
                        <div className='w-full 2xl:w-[50%] h-fit md:h-[50%] 2xl:h-full bg-transparent flex items-center justify-center'>
                            <img onClick={e => e.stopPropagation()} className='w-full md:w-[550px] 2xl:w-[90%]' src={postDrawer.data.picUrl} alt="" srcSet="" />
                        </div>

                        {/* COMMENTS */}
                        <div onClick={e => e.stopPropagation()} className='w-full 2xl:w-[50%] h-full md:h-[50%] 2xl:h-full flex flex-col justify-center gap-6 py-5'>

                            <div className='w-full 2xl:w-[80%] h-full 2xl:h-[80%] bg-white flex flex-col justify-start items-start gap-4'>

                                <div className='w-full text-center text-2xl flex items-center justify-between gap-5 bg-gray-400'>

                                    <div className='flex items-start'>

                                        <img className='w-[70px]' src={dp} alt="" srcSet="" />

                                        <div className='flex flex-col items-start justify-start'>

                                            <p>{postDrawer.data.userId.name}</p>

                                            <p className='text-[14px]'>{dayjs(postDrawer.data.createdAt).format("YYYY-MM-DD HH:MM")}</p>

                                        </div>

                                    </div>

                                    <img className='cursor-pointer' onClick={handleShowLikes} src={heart} alt="" srcSet="" />

                                </div>

                                {/* COMMENTS */}
                                <div className='flex flex-col pl-2 h-[100%] overflow-y-scroll'>
                                    {postDrawer?.data.comments.length > 0 ? postDrawer?.data.comments.map((e) => (

                                        <div key={e._id} className='flex flex-col gap-1'>

                                            <div className='flex items-center text-xl'>
                                                <img className='w-[35px]' src={dp} alt="" srcSet="" />
                                                <p>{e.userId.name}</p>
                                            </div>

                                            <p className='text-teal-500 text-1xl pl-10'>{e.comment}</p>

                                        </div>

                                    )) : "NO COMMENTS"}
                                </div>

                                {/* INPUT */}
                                <div className='w-full flex items-center justify-start border-2 border-gray-300'>
                                    <input ref={commentInputRef} className='w-[95%]' type="text" />
                                    <img onClick={handleAddComment} className='w-[30px] cursor-pointer' src={send} alt="" srcSet="" />
                                </div>

                            </div>

                        </div>

                    </>
                }

            </div>

        </>
    )
}

export default memo(PostDrawer)
