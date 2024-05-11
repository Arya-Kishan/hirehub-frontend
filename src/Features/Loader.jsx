import React, { memo } from 'react'
import loader from "../assets/loader.svg"

const Loader = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <img loading='lazy' className='w-[100px] h-[100px]' src={loader} alt="Loader" srcSet="" />
        </div>
    )
}

export default memo(Loader)
