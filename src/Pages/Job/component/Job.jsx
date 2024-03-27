import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchJobsAsync, fetchUserJobAsync, selectJobs } from '../jobSlice'
import Loader from '../../../Features/Loader'
import { selectUserId } from '../../User/userSlice'
import add from '../../../assets/add.svg'

const jobsArr = [{ title: "Jr. React Developer", location: "Lucknow", category: "Web Develoopment" },
{ title: "Sr. Mern Developer", location: "France", category: "Web Develoopment" },
{ title: "IOS Developer", location: "USA", category: "Mobile Develoopment" }]

const Job = () => {

  const navigate = useNavigate()
  const jobs = useSelector(selectJobs)
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()

  console.log(jobs);

  const handleDetails = (id) => {
    console.log(id);
    navigate(`/jobDetails/${id}`)
  }

  const handleSelectChange = (selectText) => {
    if (selectText == "all") {
      console.log("ALL");
      dispatch(fetchJobsAsync())
    } else if (selectText == "postedByMe") {
      console.log("postedByMe");
      dispatch(fetchUserJobAsync({ id: userId, query: 'postedBy' }))
    }
  }

  useEffect(() => {
    dispatch(fetchJobsAsync())
  }, [])

  return (
    <div className='w-full min-h-[100vh] flex  flex-col justify-center items-center py-[60px] px-2'>

      <h1 className='w-full h-[10vh] font-bold text-4xl text-center'>ALL AVAILABLE JOBS</h1>

      {/* SELECT */}
      <div className='w-[90%] min-h-[10vh] flex justify-end items-start gap-5 py-5'>

        <select onChange={(e) => handleSelectChange(e.target.value)} className='border-none w-[200px] px-2 py-1 text-white bg-teal-500 cursor-pointer'>
          <option className='w-[100px] p-2' value="all">All</option>
          <option className='w-[100px] p-2' value="postedByMe">Posted by Me</option>
        </select>

      </div>

      {/* MAP ALL AVAILABLE JOBS */}
      <div className='w-full min-h-[80vh] flex flex-wrap justify-center md:justify-start items-start gap-5'>

        {jobs ? jobs.map((e, i) => (
          <div key={i} className='w-[90%] md:w-[150px] lg:w-[22vw] h-[250px] lg:h-[200px] flex flex-col items-start justify-evenly p-4 shadow-lg border-2 border-gray-300'>

            <h2 className='font-bold text-2xl'>{e.title}</h2>
            <p className='text-gray-400'>{e.category}</p>
            <p className='block'>{e.location}</p>

            <button onClick={() => handleDetails(e._id)} className='w-full p-4 bg-teal-500'>Job Details</button>

          </div>
        )) : <Loader />}

      </div>

      {/* BUTTON POST NEW JOB */}
      <div onClick={() => navigate("/jobForm")} className='fixed bottom-16 right-5 bg-teal-500 px-4 py-2 rounded-lg shadow-lg cursor-pointer flex  items-center gap-1' >
        <img className='w-[30px]' src={add} alt="" srcSet="" />
        <p className='hidden md:block'>Create Job</p>
      </div>
    </div>
  )
}

export default Job
