import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { deleteJobAsync, fetchJobQueryAsync, selectJobDetail, setJobDetail } from '../jobSlice'
import Loader from '../../../Features/Loader'
import { selectLoggedInUser, selectUserId } from '../../User/userSlice'

const JobDetails = () => {

    const navigate = useNavigate()
    const jobDetail = useSelector(selectJobDetail)
    const userId = useSelector(selectUserId)
    const loggedInUser = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleApply = (employerId) => {
        navigate(`/applicationForm`)
    }

    const handleUpdateJob = () => {
        navigate(`/jobForm`)
    }

    const handleDeleteJob = () => {
        dispatch(deleteJobAsync(jobDetail._id))
    }

    useEffect(() => {
        dispatch(setJobDetail(null))
        dispatch(fetchJobQueryAsync(id))
    }, [])

    console.log("----------------");
    console.log(jobDetail?.postedBy);
    console.log(userId);
    console.log("---------------");

    return (
        <div className='w-full min-h-[100vh] flex  flex-col justify-start items-center py-[60px]'>

            <h1 className='w-full h-[5vh] font-bold text-4xl text-center'>JOB DETAILS</h1>

            {/* JOB DETAILS */}
            {jobDetail ? <>
                <div className='pt-[70px] flex flex-col lg:flex-row justify-start items-center gap-2 p-5'>

                    <div className='w-full lg:w-[40%] flex flex-col items-start justify-evenly gap-2 lg:pl-[10%]'>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Title</b>{jobDetail.title}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Country</b>{jobDetail.country}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>City</b>{jobDetail.city}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Salary</b>{jobDetail.fixedSalary}</p>
                    </div>

                    <div className='w-full lg:w-[60%] flex flex-col items-start justify-start gap-2'>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Description</b>{jobDetail.description}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Location</b>{jobDetail.location}</p>
                    </div>


                </div>

                {/* EDIT DELETE BUTTON */}
                {userId == jobDetail.postedBy && loggedInUser.role == "employer" && <>

                    <div className='w-[90%] h-[5vh] flex items-center justify-between gap-2'>
                        <button onClick={handleUpdateJob} className='w-[100px] px-5 py-2 bg-teal-500'>Edit</button>
                        <button onClick={handleDeleteJob} className='w-[100px] px-5 py-2 bg-teal-500'>Delete</button>
                    </div>

                </>}

            </> : <div className='w-full h-dvh'><Loader /></div>}


            {/* APPLY */}
            <div onClick={handleApply} className='fixed bottom-16 right-10 bg-black text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer' >Apply</div>

        </div>
    )
}

export default JobDetails
