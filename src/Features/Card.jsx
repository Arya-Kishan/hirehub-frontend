import React, { memo, useState } from 'react'
import heart1 from '../assets/heart.svg'
import heart2 from '../assets/heart2.svg'
import comment from '../assets/comment.svg'
import remove from '../assets/delete.svg'
import { useDispatch, useSelector } from "react-redux"
import { addRemoveLikeAsync, setCommentDrawer, setDialog, setLikeDrawer, setMyPost, setPostDrawer } from '../Pages/Community/communitySlice'
import { selectUserId, setOtherUserDetail } from '../Pages/User/userSlice'
import { useNavigate, useParams } from "react-router-dom"

const Card = ({ card }) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId)
    const [showLiked, setShowLiked] = useState(true)
    const navigate = useNavigate()
    const { userId: paramsId } = useParams();

    const handleAddLike = (postUserId, postId) => {
        setShowLiked(false)
        dispatch(addRemoveLikeAsync({ query: `purpose=add&type=like&userId=${userId}&postId=${postId}` }))
    }

    const handleRemoveLike = (postUserId, postId) => {
        setShowLiked(true)
        dispatch(addRemoveLikeAsync({ query: `purpose=delete&type=like&userId=${userId}&postId=${postId}` }))
    }

    const handleShowComments = () => {
        dispatch(setCommentDrawer({ show: true, data: card }))
    }

    const handleShowLikes = () => {
        dispatch(setLikeDrawer({ show: true, data: card }))
    }

    const handleDeletePost = (postId) => {
        console.log(postId);
        dispatch(setDialog({ show: true, type: "post", id: postId }));
    }

    const handleNavigateToOtherProfile = (otherUserId) => {

        if (window.location.pathname.includes("profile")) {
            return;
        } else {
            navigate(`/profile/${otherUserId}`)
            dispatch(setOtherUserDetail())
            dispatch(setMyPost())
        }

    }

    return (
        <div className='w-full md:w-[25vw] bg-white shadow-2xl flex flex-col gap-1 p-3 relative border-2 border-gray-100 select-none rounded-2xl'>

           <img loading='lazy' onClick={() => dispatch(setPostDrawer({ data: card, show: true }))} className='w-full md:w-full h-[250px] md:h-[200px] bg-teal-500' src={card.picUrl} alt="" srcSet="" draggable="false" />

            {card.userId && <div className='w-full flex items-center justify-between'>

                <div onClick={() => handleNavigateToOtherProfile(card.userId._id)} className='flex gap-1 items-center justify-start cursor-pointer'>
                   <img loading='lazy' className='w-[30px] h-[30px] rounded-full' src={card.userId?.profilePic} alt="" srcSet="" />
                    <p className='text-[14px] font-semibold'>{card?.userId?.name}</p>
                </div>

                <div className='flex items-center justify-between gap-2 cursor-pointer'>

                    {showLiked ?<img loading='lazy' onClick={() => handleAddLike(card.userId?._id, card._id)} className='w-[18px]' src={heart1} alt="" srcSet="" /> :<img loading='lazy' onClick={() => handleRemoveLike(card.userId?._id, card._id)} className='w-[18px]' src={heart2} alt="" srcSet="" />}

                    <p onClick={handleShowLikes} className='text-[14px]'>{card.likes.length}</p>

                    <div onClick={() => handleShowComments(card.userId?._id, card._id)} className='flex items-center justify-start'>
                       <img loading='lazy' className='w-[18px]' src={comment} alt="" srcSet="" />

                        <p className='text-[14px]'>{card.comments.length}</p>
                    </div>

                </div>

            </div>}

            <p className='hidden md:block mt-2 text-teal-600'>{card.hashtags?.map((hashtag, i) => <span key={i}>{hashtag}</span>)}</p>

            <p className='hidden md:block text-[14px] text-black'>{card.description}</p>

            {window.location.pathname.includes("profile") && paramsId == userId &&<img loading='lazy' onClick={() => handleDeletePost(card._id)} className='w-[20px] absolute top-6 right-4' src={remove} alt="" srcSet="" />}

        </div>
    )
}

export default memo(Card)
