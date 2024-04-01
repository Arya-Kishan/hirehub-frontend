import React from 'react'
import bigImg4 from "../../../assets/bigImg4.svg"
import bigImg5 from "../../../assets/bigImg5.svg"


const Fifth = () => {
    return (
        <div className='w-full flex h-fit flex-col md:flex-row justify-center items-center'>

            <div className='w-full md:w-[50%] min-h-[60vh] md:h-[80vh] flex flex-col gap-8 justify-between items-center p-2 bg-teal-300'>

                <div className='flex flex-col justify-start items-start gap-5'>
                    <h1 className='text-5xl font-semibold'>Find Job <span className='text-teal-500'>Today</span></h1>
                    <p className='text-2xl text-white'>Grab your job at latest don’t wait for a minute</p>
                    <button className='bg-teal-500 px-4 py-2'>Search</button>
                </div>

                <div className='w-full flex justify-end items-end'><img src={bigImg4} alt="" srcSet="" /></div>

            </div>

            <div className='w-full md:w-[50%] min-h-[60vh] md:h-[80vh] flex flex-col gap-8 justify-between items-center p-2 bg-teal-800'>

                <div className='flex flex-col justify-start items-start gap-5'>
                    <h1 className='text-5xl font-semibold'>Search <span className='text-teal-500'>People</span></h1>
                    <p className='text-2xl text-white'>Find professional around and across all skills</p>
                    <button className='bg-teal-500 px-4 py-2'>Search</button>
                </div>

                <div className='w-full flex justify-end items-end'><img src={bigImg5} alt="" srcSet="" /></div>

            </div>

        </div>
    )
}

export default Fifth
