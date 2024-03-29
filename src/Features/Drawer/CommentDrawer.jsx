import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import dp from '../../assets/dp.svg'
import remove from '../../assets/delete2.svg'
import send1 from '../../assets/send1.svg'
import send2 from '../../assets/send2.svg'
import arrow from '../../assets/arrow.svg'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addRemoveCommentAsync, selectCommentDrawer, setCommentDrawer, setPostDrawer } from '../../Pages/Community/communitySlice';
import { selectUserId } from '../../Pages/User/userSlice';

const CommentDrawer = () => {

    const commentInputRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const commentDrawer = useSelector(selectCommentDrawer)
    // HERE COMMENT_DRAWER_DATA IS WHOLE SINGLE POST DATA
    const loggedInUserId = useSelector(selectUserId)

    const [toggle, setToggle] = useState("top-100vh")

    const handleHideDrawer = () => {
        setToggle("top-[100vh]")
        dispatch(setCommentDrawer({show:false,data:null}))
    }

    const handleAddComment = () => {
        dispatch(addRemoveCommentAsync({ query: `purpose=add&type=comment&userId=${loggedInUserId}&postId=${commentDrawer?.data._id}&comment=${commentInputRef.current.value}` }))
        dispatch(setPostDrawer({ show: false, data: null }))
        commentInputRef.current.value = "";
    }

    const handleDeleteComment = (comment) => {
        dispatch(addRemoveCommentAsync({ query: `purpose=delete&type=comment&userId=${loggedInUserId}&postId=${commentDrawer?.data._id}&comment=${comment}` }))
    }

    const handleNavigateProfile = (userId) => {
        navigate(`/profile/${userId}`)
        setToggle("top-[100vh]")

    }

    useEffect(() => {

        if (commentDrawer?.show == true) {
            setToggle("top-[0vh]")
        } else {
            setToggle("top-[100vh]")

        }

    }, [commentDrawer])


    return (
        <div className={`w-full h-[100vh] fixed ${toggle} transition-all duration-500 left-0 flex flex-col items-start justify-end pt-[60px] pb-[46px]`} onClick={handleHideDrawer}
        >

            {/* DOWN ARROW ICON */}
            <div onClick={handleHideDrawer} className='w-full h-[7vh] flex justify-center items-center rotate-90'><img className='w-[40px] p-1 bg-teal-500 rounded-lg' src={arrow} alt="" srcSet="" /></div>

            {/* COMMENTS DATA TO MAP */}
            {commentDrawer?.data?.comments.length > 0 ? <div onClick={e => e.stopPropagation()} className='w-full h-[40vh] overflow-y-scroll bg-teal-500 pb-[10px]'>

                {commentDrawer?.data.comments.map((e,i) => (
                    <div key={i} className='w-full flex-col flex items-start justify-center p-2'>

                        <div className='w-full flex justify-between items-center'>

                            <div onClick={() => handleNavigateProfile(e.userId._id)} className='flex items-center justify-start gap-2'>

                                <img className='w-[50px]' src={dp} alt="" srcSet="" />
                                <p className='text-xl'>{e.userId.name}</p>

                            </div>

                            <img onClick={() => handleDeleteComment(e.comment)} className='w-[20px]' src={remove} alt="" srcSet="" />

                        </div>

                        <div className='text-white pl-[55px]'>{e.comment}</div>

                    </div>
                ))}

            </div> : <div className='w-full h-[40vh] bg-teal-500'>NO COMMENTS</div>}

            {/* INPUT BOX FOR COMMENTING ON POST */}
            <div onClick={e => e.stopPropagation()} className='w-full flex items-center justify-start bg-teal-500 border-2 border-white'>

                <input ref={commentInputRef} className='w-[98%] outline-none border-none' type="text" name="" id="" />
                
                <img onClick={handleAddComment} className='w-[40px] p-1 bg-white' src={send2} alt="" srcSet="" />

            </div>

        </div>
    )
}

export default CommentDrawer
