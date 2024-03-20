import React from 'react'
import heart from '../assets/heart.svg'
import comment from '../assets/comment.svg'
import dp from '../assets/dp.svg'

const Card = ({card}) => {
    return (
        <div className='w-[70vw] h-[350px] md:w-[30vw] md:h-[350px] bg-white shadow-2xl flex flex-col gap-1 justify-evenly items-start p-3'>

            <img className='w-full h-[60%] bg-teal-500' src={card.picUrl} alt="" srcSet="" />

            <div className='w-full flex items-center justify-between'>

                <div className='flex gap-1 items-center justify-start'>
                    <img className='w-[45px]' src={dp} alt="" srcSet="" />
                    <p className='text-[14px]'>{card?.userId?.name}</p>
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <img className='w-[18px]' src={heart} alt="" srcSet="" />
                    <p className='text-[14px]'>{card.likes.length}</p>
                    <img className='w-[18px]' src={comment} alt="" srcSet="" />
                    <p className='text-[14px]'>{card.comments.length}</p>
                </div>

            </div>

            <p className='mt-2 text-teal-600'>{card.hashtags?.map((hashtag, i) => <span key={i}>{hashtag}</span>)}</p>

            <p className='text-[14px] text-black'>{card.description}</p>

        </div>
    )
}

export default Card
