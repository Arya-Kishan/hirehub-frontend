import React, { memo, useState } from 'react'
import heart1 from '../assets/heart.svg'
import heart2 from '../assets/heart2.svg'
import comment from '../assets/comment.svg'
import dp from '../assets/dp.svg'
import { useDispatch, useSelector } from "react-redux"
import { addRemoveLikeAsync, setCommentDrawer, setCommentDrawerData, setLikeDrawer, setLikeDrawerData, setPostDrawer } from '../Pages/Community/communitySlice'
import { selectDrawer, selectDrawerData, setDrawer, setDrawerData } from '../Pages/Forms/formsSlice'
import { selectUserId } from '../Pages/User/userSlice'
import { useNavigate } from "react-router-dom"

const Card = ({ card }) => {

    const dispatch = useDispatch();
    const drawer = useSelector(selectDrawer)
    const drawerData = useSelector(selectDrawerData)
    const userId = useSelector(selectUserId)
    const [showLiked, setShowLiked] = useState(true)
    const navigate = useNavigate()

    const handleAddLike = (postUserId, postId) => {
        setShowLiked(false)
        dispatch(addRemoveLikeAsync({ query: `purpose=add&type=like&userId=${userId}&postId=${postId}` }))
    }

    const handleRemoveLike = (postUserId,postId) => {
        setShowLiked(true)
        dispatch(addRemoveLikeAsync({ query: `purpose=delete&type=like&userId=${userId}&postId=${postId}` }))
    }

    const handleShowComments = () => {
        dispatch(setCommentDrawer(true))
        dispatch(setCommentDrawerData(card))
    }

    const handleShowLikes = () => {
        dispatch(setLikeDrawer(true))
        dispatch(setLikeDrawerData(card))
    }

    // console.log("-------card-----");
    
    return (
        <div className='w-[80vw] md:w-[25vw] lg:w-[30vw] h-[350px] md:h-[350px] bg-white shadow-2xl flex flex-col gap-1 justify-evenly items-start p-3'>

            <img onClick={()=>dispatch(setPostDrawer({data:card,show:true}))} loading='lazy' className='w-full h-[60%] bg-teal-500' src={card.picUrl} alt="" srcSet="" />

            <div className='w-full flex items-center justify-between'>

                <div onClick={() => navigate(`/profile/${card.userId._id}`)} className='flex gap-1 items-center justify-start cursor-pointer'>
                    <img className='w-[45px]' src={dp} alt="" srcSet="" />
                    <p className='text-[14px]'>{card?.userId?.name}</p>
                </div>

                <div className='flex items-center justify-between gap-2 cursor-pointer'>

                    {showLiked ? <img onClick={() => handleAddLike(card.userId._id, card._id)} className='w-[18px]' src={heart1} alt="" srcSet="" /> : <img onClick={() => handleRemoveLike(card.userId._id, card._id)} className='w-[18px]' src={heart2} alt="" srcSet="" />}

                    <p onClick={handleShowLikes} className='text-[14px]'>{card.likes.length}</p>

                    <div onClick={() => handleShowComments(card.userId._id, card._id)} className='flex items-center justify-start'>
                        <img className='w-[18px]' src={comment} alt="" srcSet="" />

                        <p className='text-[14px]'>{card.comments.length}</p>
                    </div>

                </div>

            </div>

            <p className='mt-2 text-teal-600'>{card.hashtags?.map((hashtag, i) => <span key={i}>{hashtag}</span>)}</p>

            <p className='text-[14px] text-black'>{card.description}</p>

        </div>
    )
}

export default memo(Card)
