import React, { useEffect, useRef } from 'react'
import dp from '../../../assets/dp.svg'
import quote from '../../../assets/quote.svg'

const arr = [
    {
        name: "Arya Kishan",
        title: 'Developer',
        desc: "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all",
        shortDesc:"I just wanted to share a quick note and let you know that you guys do a really good job."
    },
    {
        name: "Arya Kishan",
        title: 'Developer',
        desc: "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all",
        shortDesc:"I just wanted to share a quick note and let you know that you guys do a really good job."
    },
    {
        name: "Arya Kishan",
        title: 'Developer',
        desc: "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites are to update and manage. I never have any problem at all",
        shortDesc:"I just wanted to share a quick note and let you know that you guys do a really good job."
    },
]

const Sixth = () => {

    return (
        <div className='py-6 bg-gradient-to-b from-white to-gray-400'>

            <h1 className='w-full font-bold text-5xl text-center'>Testimonial</h1>

            <div className='w-full flex flex-col md:flex-row items-center justify-evenly gap-10 md:gap-5 p-2 select-none px-2 py-10'>

                {arr.map((e,i) => (
                    <div key={i} className='w-[300px] md:w-[400px] h-[200px] md:h-[300px] flex flex-col justify-center items-center gap-3 shadow-lg border-2 border-gray-200 shadow-black rounded-lg p-2 relative'>

                        <img className='absolute -bottom-[20px] left-[50%] -translate-x-[50%]' src={dp} alt="" srcSet="" />

                        <div className='hidden md:block text-gray-500 px-10'>{e.desc}</div>

                        <div className='block md:hidden text-gray-500 px-10'>{e.shortDesc}</div>


                        <img className='absolute top-[60px] left-[10px] w-[30px] rotate-180' src={quote} alt="" srcSet="" />

                        <img className='absolute bottom-[60px] right-[10px] w-[30px]' src={quote} alt="" srcSet="" />

                    </div>
                ))}

            </div>

            <div className='w-full text-center'><span className='bg-teal-500 px-4 py-1 rounded-md'>More</span></div>
        </div>
    )
}

export default Sixth
