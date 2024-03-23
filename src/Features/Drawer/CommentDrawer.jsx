import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import dp from '../../assets/dp.svg'
import remove from '../../assets/delete2.svg'
import send1 from '../../assets/send1.svg'
import send2 from '../../assets/send2.svg'
import arrow from '../../assets/arrow.svg'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addRemoveCommentAsync, selectCommentDrawer, selectCommentDrawerData, setCommentDrawer } from '../../Pages/Community/communitySlice';
import { selectUserId } from '../../Pages/User/userSlice';

const CommentDrawer = () => {

    const commentInputRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const commentDrawer = useSelector(selectCommentDrawer)
    // HERE COMMENT_DRAWER_DATA IS WHOLE SINGLE POST DATA
    const commentDrawerData = useSelector(selectCommentDrawerData)
    const loggedInUserId = useSelector(selectUserId)

    const [height, setHeight] = useState(0)

    const handleHideDrawer = () => {
        dispatch(setCommentDrawer(false))
    }

    const handleAddComment = () => {
        dispatch(addRemoveCommentAsync({ query: `purpose=add&type=comment&userId=${loggedInUserId}&postId=${commentDrawerData._id}&comment=${commentInputRef.current.value}` }))
    }

    const handleDeleteComment = (comment) => {
        dispatch(addRemoveCommentAsync({ query: `purpose=delete&type=comment&userId=${loggedInUserId}&postId=${commentDrawerData._id}&comment=${comment}` }))
    }

    const handleNavigateProfile = (userId) => {
        navigate(`/profile/${userId}`)
        dispatch(setCommentDrawer(false))
    }

    useEffect(() => {

        if (commentDrawer == true) {
            setHeight('-100vh')
        } else {
            setHeight('0vh')
        }

    }, [commentDrawer])

    // console.log(commentDrawerData);
    // console.log(commentDrawerData?.comments);

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: height }}
            className='w-full h-[100vh] bg-gradient-to-b from-black fixed top-[100vh] left-0 flex flex-col items-start justify-end pt-[60px]'
            onClick={handleHideDrawer}
        >

            {/* DOWN ARROW ICON */}
            <div onClick={handleHideDrawer} className='w-full h-[7vh] flex justify-center items-center rotate-90'><img className='w-[40px] p-1 bg-white rounded-lg' src={arrow} alt="" srcSet="" /></div>

            {/* COMMENTS DATA TO MAP */}
            {commentDrawerData?.comments.length > 0 ? <div onClick={e => e.stopPropagation()} className='w-full h-[40vh] overflow-y-scroll bg-teal-500 pb-[10px]'>

                {commentDrawerData.comments.map((e) => (
                    <div className='w-full flex-col flex items-start justify-center p-2'>

                        <div className='w-full flex justify-between items-center'>

                            <div onClick={()=>handleNavigateProfile(e.userId._id)} className='flex items-center justify-start gap-2'>

                                <img className='w-[50px]' src={dp} alt="" srcSet="" />
                                <p className='text-xl'>{e.userId.name}</p>

                            </div>

                            <img onClick={() => handleDeleteComment(e.comment)} className='w-[20px]' src={remove} alt="" srcSet="" />

                        </div>

                        <div className='text-white pl-[55px]'>{e.comment}</div>

                    </div>
                ))}

            </div> : "NO COMMENTS"}

            {/* INPUT BOX FOR COMMENTING ON POST */}
            <div onClick={e => e.stopPropagation()} className='w-full flex items-center justify-start bg-teal-500'>
                <input ref={commentInputRef} className='w-[90%] outline-none border-none' type="text" name="" id="" />
                <img onClick={handleAddComment} className='w-[40px] p-1' src={send2} alt="" srcSet="" />
            </div>

        </motion.div>
    )
}

export default CommentDrawer
