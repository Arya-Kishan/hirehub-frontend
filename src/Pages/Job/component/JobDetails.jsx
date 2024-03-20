import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { deleteJobAsync, fetchJobQueryAsync, selectJobDetail } from '../jobSlice'
import Loader from '../../../Features/Loader'
import { setEmployerId } from '../../Forms/formsSlice'
import { selectUserId } from '../../User/userSlice'

const JobDetails = () => {

    const navigate = useNavigate()
    const jobDetail = useSelector(selectJobDetail)
    const userId = useSelector(selectUserId)
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleApply = (employerId) => {
        navigate(`/applicationForm`)
        dispatch(setEmployerId(employerId))
    }

    const handleUpdateJob = () => {
        navigate(`/jobForm`)
    }

    const handleDeleteJob = () => {
        dispatch(deleteJobAsync(jobDetail._id))
    }

    useEffect(() => {
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
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Category</b>{jobDetail.category}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Salary</b>{jobDetail.fixedSalary}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Expired</b>{jobDetail.expired}</p>
                    </div>

                    <div className='w-full lg:w-[60%] flex flex-col items-start justify-start gap-2'>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Description</b>{jobDetail.description}</p>
                        <p className='flex flex-col items-start justify-start gap-1'><b className='text-xl'>Location</b>{jobDetail.location}</p>
                    </div>


                </div>

                {/* EDIT DELETE BUTTON */}
                {userId == jobDetail.postedBy && <>

                    <div className='w-[90%] h-[5vh] flex items-center justify-between gap-2'>
                        <button onClick={handleUpdateJob} className='w-[100px] px-5 py-2 bg-teal-500'>Edit</button>
                        <button onClick={handleDeleteJob} className='w-[100px] px-5 py-2 bg-teal-500'>Delete</button>
                    </div>

                </>}

            </> : <Loader></Loader>}


            {/* APPLY */}
            <div onClick={handleApply} className='fixed bottom-5 right-10 bg-teal-500 px-4 py-2 rounded-lg shadow-lg cursor-pointer' >Apply</div>

        </div>
    )
}

export default JobDetails
