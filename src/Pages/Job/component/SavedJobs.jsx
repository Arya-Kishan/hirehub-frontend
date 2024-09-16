// THIS ELEMENT WILL SHOW SAVED,APPLIED AND REJECTED USER JOBS
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSavedAppliedPostedJobAsync, fetchUserJobAsync, selectJobs, selectSavedAppliedPostedJobs } from '../jobSlice';
import { selectLoggedInUser, selectUserId } from '../../User/userSlice';
import JobCard from '../../../Features/JobCard';
import { getApplicationAsync, selectApplications } from '../../Application/applicationSlice';
import add from '../../../assets/add.svg'

const SavedJobs = () => {

    const { type } = useParams()
    const loggedInUser = useSelector(selectLoggedInUser)
    const loggedInUserId = useSelector(selectUserId)
    const applications = useSelector(selectApplications)
    const savedJobs = useSelector(selectJobs)
    const selectedJobs = useSelector(selectSavedAppliedPostedJobs)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if (type == "saved") {
            dispatch(fetchSavedAppliedPostedJobAsync({ id: JSON.stringify(loggedInUser.savedJobs), query: "jobIdArr" }))
        } else if (type == "applied") {
            dispatch(getApplicationAsync({ id: loggedInUserId, query: "applicantId" }))
        } else if (type == "posted") {
            dispatch(fetchSavedAppliedPostedJobAsync({ id: loggedInUserId, query: "postedBy" }))
        }


    }, [])

    // console.log(applications);
    // console.log(selectedJobs);
    console.log(selectedJobs);

    return (
        <div className='w-full h-[calc(100vh-70px)] mt-[70px] px-4 pb-[70px] overflow-scroll'>

            <h1 className='w-full font-bold text-2xl capitalize flex items-center justify-between px-4'>
                <p>{type} Jobs</p>
                {loggedInUser.role == "employer" && <img loading='lazy' onClick={() => navigate("/jobForm")} className='w-[40px]' src={add} alt="" srcSet="" />}
            </h1>

            {type == "saved" && (selectedJobs && selectedJobs.length > 0 ? <div className='flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 mt-4'>
                {selectedJobs?.map((e) => (<JobCard job={e} />))}
            </div> : <div className='uppercase'>NO {type} JOBS</div>)}

            {type == "posted" && (selectedJobs && selectedJobs.length > 0 ? <div className='flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 mt-4'>
                {selectedJobs?.map((e) => (<JobCard job={e} />))}
            </div> : <div className='uppercase'>NO {type} JOBS</div>)}

            {type == "applied" && (applications && applications.length > 0 ? <div className='flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 mt-4'>
                {applications?.map((e) => (<JobCard job={e.jobId} />))}
            </div> : <div className='uppercase'>NO {type} JOBS</div>)}

        </div>
    )
}

export default SavedJobs
