import React from 'react'
import dayjs from "dayjs"
import add from '../assets/add.svg'
import remove from '../assets/delete.svg'
import bookmark from '../assets/bookmark.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId, updateUserAsync } from '../Pages/User/userSlice'


const JobCard = ({ job }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUserId = useSelector(selectUserId)

    const handleJobSaved = (jobId) => {

        console.log(jobId);
        console.log("SAVING JOB TO USER MODEL");

        let formData = new FormData()
        formData.append("savedJobs", jobId)
        dispatch(updateUserAsync({ formData, userId: loggedInUserId }))
    }

    const experience = (exp) => {
        if (exp == 1) {
            return <span className='text-green-500'>Entry</span>
        } else if (exp == 2) {
            return <span className='text-yellow-500'>Intermediate</span>
        } else {
            return <span className='text-red-500'>Experienced</span>
        }
    }

    return (
        <>

            {job &&
                <div onClick={() => navigate(`/jobDetails/${job?._id}`)} className='w-full lg:w-[38vw] flex flex-col items-start justify-start bg-white shadow-md shadow-black p-2 gap-2 md:gap-5 rounded-lg flex-shrink-0'>

                    {/* NAME OF COMPANY, JOB TITLE, SAVE BUTTON */}
                    <div className='w-full flex items-center justify-between gap-1'>

                        <div className='flex gap-2'>
                            <div className='w-[30px] md:w-[40px] h-[30px] md:h-[40px] rounded-full bg-white'><img loading='lazy' className='w-[50px]' src={add} alt="" srcSet="" /></div>

                            <div>
                                <p className='text-[16px] md:text-xl font-semibold'>{job.title}</p>
                                <p className='flex text-[12px] md:text-[14px] text-gray-500'>
                                    <span className='text-teal-500 mr-1'>{job.companyName}</span>
                                    <span>+25 Applicants</span>
                                </p>
                            </div>
                        </div>

                        {!window.location.href.includes("/savedJob/saved") ? <div onClick={e => e.stopPropagation()} className='self-start'><img loading='lazy' onClick={() => handleJobSaved(job._id)} className='w-[20px] h-[20px] p-1 rounded-full bg-black' src={bookmark} alt="" srcSet="" /></div> : <div onClick={e => e.stopPropagation()} className='self-start'><img loading='lazy' className='w-[30px] h-[30px] p-1 rounded-full bg-black' src={remove} alt="" srcSet="" /></div>}

                    </div>

                    {/* ENTRY,FULL TIME, REMOTE */}
                    <div className='hidden w-full md:flex items-center justify-start gap-2 lg:text-[14px]'>
                        {job.type.map((e, i) => (
                            <p key={i} className='bg-orange-500 px-4 py-1 rounded-md'>{e}</p>
                        ))}
                    </div>

                    {/* DESCRIPTION */}
                    <div className=' w-full text-gray-800 text-[13px] lg:text-[16px]'>
                        {job.description}
                    </div>

                    <div className='w-full flex justify-between text-[13px] md:text-1xl'>
                        <p>{job.fixedSalary.toString().slice(0, 2)}K / {experience(job.experience)}</p>
                        <p>{dayjs(job.postedOn).format("DD MMM")}</p>
                    </div>

                </div>
            }

        </>
    )
}

export default JobCard
