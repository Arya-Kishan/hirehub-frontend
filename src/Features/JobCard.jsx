import React from 'react'
import dayjs from "dayjs"
import add from '../assets/add.svg'

const JobCard = ({job}) => {
    return (
        <div className='w-full lg:w-[38vw] flex flex-col items-start justify-start bg-gray-200 shadow-lg p-2 gap-2 md:gap-5 rounded-lg'>

            {/* NAME OF COMPANY, JOB TITLE, SAVE BUTTON */}
            <div className='w-full flex items-center justify-between gap-1'>

                <div className='flex gap-2'>
                    <div className='w-[40px] h-[40px] rounded-full bg-red-500'><img className='w-[50px]' src={add} alt="" srcSet="" /></div>

                    <div>
                        <p className='text-xl font-semibold'>{job.title}</p>
                        <p className='flex text-[14px] text-gray-500'>
                            <span className='text-red-500'>{job.companyName}</span>
                            <span>+25 Applicants</span>
                        </p>
                    </div>
                </div>

                <div className=''><img className='w-[30px]' src={add} alt="" srcSet="" /></div>

            </div>

            {/* ENTRY,FULL TIME, REMOTE */}
            <div className='hidden w-full md:flex items-center justify-start gap-2'>
                {job.type.map((e, i) => (
                    <p key={i} className='bg-orange-500 px-4 py-1 rounded-md'>{e}</p>
                ))}
            </div>

            {/* DESCRIPTION */}
            <div className='w-full text-gray-800'>
                {job.description}
            </div>

            <div className='w-full text-end'>{dayjs(job.postedOn).format("DD MMM")}</div>

        </div>
    )
}

export default JobCard
