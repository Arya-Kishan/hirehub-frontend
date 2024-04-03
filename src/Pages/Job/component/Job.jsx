import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { fetchCountriesAsync, fetchJobsAsync, selectCountries, selectJobs } from '../jobSlice'
import { selectLoggedInUser, selectUserId } from '../../User/userSlice'
import search from '../../../assets/search.svg'
import filter from '../../../assets/filter.svg'
import bookmark from '../../../assets/bookmark.svg'
import accepted from '../../../assets/accepted.svg'
import rejected from '../../../assets/rejected.svg'
import Search from '../../Search/component/Search'
import JobCard from '../../../Features/JobCard'


const jobTypeArr = ["full-Time", "Part-Time", "Internship", "Volunteering"]

const experienceArr = ["Entry Level", "Intermediate", "Expert"]

const jobCategoryArr = ["frontend", "backend", "fullStack", "Designer", "Developer"]

let query;

let typeArr2 = [];
let experienceArr2 = [];
let categoryArr2 = [];

let count = 0;

const Job = () => {

  const [toggle, setToggle] = useState("top-[100vh]")
  const [toggle2, setToggle2] = useState(false)
  const [range1, setRange1] = useState(10000)
  const [range2, setRange2] = useState(100000)
  const [showSearch, setShowSearch] = useState(null)
  const [country, setCountry] = useState(null)

  const navigate = useNavigate()
  const jobs = useSelector(selectJobs)
  const userId = useSelector(selectUserId)
  const countriesArr = useSelector(selectCountries)
  const loggedInUser = useSelector(selectLoggedInUser);

  const dispatch = useDispatch()


  const handleDetails = (id) => {
    console.log(id);
    navigate(`/jobDetails/${id}`)
  }


  const handleJobTypes = (e, type) => {

    if (e.target.checked) {

      if (type == "type") {
        typeArr2.push(e.target.value)
      }

      if (type == "experience") {
        experienceArr2.push(e.target.value)
      }

      if (type == "category") {
        categoryArr2.push(e.target.value)
      }

      query = (`type=${JSON.stringify(typeArr2)}&experience=${JSON.stringify(experienceArr2)}&category=${JSON.stringify(categoryArr2)}&salaryFrom=${range1}&salaryTo=${range2}&country=${country}`)

    } else {

      if (type == "type") {
        let i = typeArr2.findIndex((type) => type == e.target.value)
        typeArr2.splice(i, 1)
      }

      if (type == "experience") {
        let i = experienceArr2.findIndex((type) => type == e.target.value)
        experienceArr2.splice(i, 1)
      }

      if (type == "category") {
        let i = categoryArr2.findIndex((type) => type == e.target.value)
        categoryArr2.splice(i, 1)
      }

      query = (`type=${JSON.stringify(typeArr2)}&experience=${JSON.stringify(experienceArr2)}&category=${JSON.stringify(categoryArr2)}&salaryFrom=${range1}&salaryTo=${range2}&country=${country}`)

    }

    console.log(query);

    let arya = query.split("&")
    // console.log(arya);

    if (typeArr2.length == 0) {
      let i = arya.findIndex((e) => e.includes("type"))
      arya.splice(i, 1)
    }

    if (experienceArr2.length == 0) {
      let i = arya.findIndex((e) => e.includes("experience"))
      arya.splice(i, 1)
    }

    if (categoryArr2.length == 0) {
      let i = arya.findIndex((e) => e.includes("category"))
      arya.splice(i, 1)
    }

    if (country == null) {
      let i = arya.findIndex((e) => e.includes("country"))
      arya.splice(i, 1)
    }

    query = (arya.join("&"));
    console.log(query);

    dispatch(fetchJobsAsync({ page: 0, query: query }))

    // experience=[1,2]&type=["Internship"]&category=["web"]&salaryFrom=10000&salaryTo=40000&country=China

  }

  const fetchCountryData = (country_1) => {
    dispatch(fetchJobsAsync({ page: 0, query: `country=${country_1}` }))
    setCountry(country_1)
  }

  const checkBoxComp = () => (
    <>

      {/* COUNTRY */}
      <select onChange={e => fetchCountryData(e.target.value)}>
        <option value="">Country</option>
        {countriesArr?.map((e) => (
          <option key={e._id} value={e.country}>{e.country}</option>
        ))}
      </select>

      {/* JOB TYPE CHECKBOXES */}
      <div className='flex flex-col gap-2'>

        <h2 className='text-2xl font-semibold'>Job Type</h2>

        <div className='flex flex-col'>

          {jobTypeArr?.map((e, i) => (
            <div key={i} className='flex gap-1'>
              <input onClick={(e) => handleJobTypes(e, "type")} type="checkbox" value={e} />
              <span>{e}</span>
            </div>
          ))}

        </div>

      </div>

      {/* SALARY RANGE */}
      <div onClick={() => setToggle2(true)} className='flex flex-col gap-2'>

        <h2 className='text-2xl font-semibold'>Salary Range</h2>

        <p>{range1} - {range2}</p>

      </div>

      {/* EXPERIENCED LEVEL CHECKBOXES */}
      <div className='flex flex-col gap-2'>

        <h2 className='text-2xl font-semibold'>Experience Level</h2>

        <div className='flex flex-col'>

          {experienceArr.map((e, i) => (
            <div key={i} className='flex gap-1'>
              <input onClick={(e) => handleJobTypes(e, "experience")} value={i + 1} type="checkbox" />
              <span>{e}</span>
            </div>
          ))}

        </div>

      </div>

      {/* JOB CATEGORY CHECKBOXES */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Job Category</h2>

        <div className='flex flex-col'>
          {jobCategoryArr.map((e, i) => (
            <div key={i} className='flex gap-1'>
              <input onClick={(e) => handleJobTypes(e, "category")} type="checkbox" value={e} />
              <span>{e}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )


  useEffect(() => {
    dispatch(fetchJobsAsync({ page: 0, query: "" }))
    dispatch(fetchCountriesAsync())
  }, [])



  return (
    <>

      {/* SEARCH FIELD  */}
      <div className='w-full h-[20vh] md:h-[20vh] bg-teal-500 flex flex-col justify-center gap-4 md:px-10 md:py-4 text-white p-2 mt-[70px]'>

        <div className='text-2xl md:text-3xl font-bold'>Find your dream job here</div>

        <div className='flex items-center bg-white rounded-2xl gap-1 p-1 md:py-2 md:px-2'>

          <img className="w-[25px]" src={search} alt="" srcSet="" />

          <input onFocus={() => setShowSearch(true)} className='w-full' type="text" placeholder='Job title or keyword' />

          <p className='hidden md:block w-[100px] bg-black text-white px-5 py-1 rounded-lg'>Search</p>

        </div>

      </div>

      <div className='flex md:hidden justify-evenly gap-4 py-5 bg-[#E5E7EB]'>

        <div onClick={() => navigate(`/savedJob/saved`)} className='w-[80px] h-[80px] bg-white p-2 flex flex-col justify-center items-center gap-1 rounded-lg text-[14px]'>
          <img className='w-[40px] bg-teal-500 p-2 rounded-full' src={bookmark} alt="" srcSet="" />
          <p>Saved</p>
        </div>


        {loggedInUser.role == "applicant" ? <div onClick={() => navigate(`/savedJob/applied`)} className='w-[80px] h-[80px] bg-white p-2 flex flex-col justify-center items-center gap-1 rounded-lg text-[14px]'>
          <img className='w-[40px] bg-teal-500 p-2 rounded-full' src={accepted} alt="" srcSet="" />
          <p>Applied</p>
        </div> : <div onClick={() => navigate(`/savedJob/posted`)} className='w-[80px] h-[80px] bg-white p-2 flex flex-col justify-center items-center gap-1 rounded-lg text-[14px]'>
          <img className='w-[40px] bg-teal-500 p-2 rounded-full' src={accepted} alt="" srcSet="" />
          <p>Posted</p>
        </div>}


        <div onClick={() => navigate(`/application`)} className='w-[80px] h-[80px] bg-white p-2 flex flex-col justify-center items-center gap-1 rounded-lg text-[14px]'>
          <img className='w-[40px] bg-teal-500 p-2 rounded-full' src={rejected} alt="" srcSet="" />
          <p>Application</p>
        </div>


      </div>

      {/* MAIN ROW  */}
      <div className='w-full h-[80vh] flex bg-gray-200 overflow-scroll'>

        {/* LEFT SIDE */}
        <div className='hidden md:w-[20%] h-full md:flex flex-col gap-8 p-4 overflow-scroll'>

          {checkBoxComp()}

        </div>

        {/* RIGHT SIDE */}
        <div className='w-full md:w-[80%] h-full flex flex-col'>

          <div className='w-full flex justify-between items-center gap-5 p-2'>

            <h2 className='font-bold text-xl'>Jobs</h2>
            <img onClick={() => setToggle("top-0")} className='w-[25px]' src={filter} alt="" srcSet="" />

          </div>

          <div className='w-full flex flex-wrap gap-5  p-2 overflow-scroll'>
            {/* JOB CARD */}
            {jobs?.map((job, i) => (
              <JobCard key={i} job={job} />
            ))}
          </div>

        </div>

      </div>

      {/* LEFT BOX FOR MOBILE RESPONSIVE */}
      <div onClick={() => setToggle("top-[100vh]")} className={`fixed ${toggle} left-0 w-full h-[100vh] transition-all duration-700 flex items-end`}>

        <div onClick={e => e.stopPropagation()} className='w-full h-[50vh] bg-red-500 flex flex-col gap-8 p-4 overflow-scroll'>
          {checkBoxComp()}
        </div>

      </div>

      {/* INPUT RANGE FIXED BOX */}
      {toggle2 && <div onClick={() => setToggle2(false)} className='w-full h-[100vh] fixed top-0 left-0 bg-gradient-to-r from-black flex justify-center items-center'>

        <div onClick={e => e.stopPropagation()} className='w-[50%] h-[50%] bg-teal-500 rounded-2xl flex flex-col gap-6 justify-center items-center'>

          <div className='flex items-center justify-center gap-2 p-2'>
            <input onChange={(e) => {
              setRange1(e.target.value)
            }} type="range" min={10000} max={100000} value={range1} step={1000} />
            <input onChange={(e) => {
              setRange2(e.target.value)
            }} type="range" min={10000} max={100000} value={range2} step={1000} />
          </div>

          <p className='text-3xl'>{range1} - {range2}</p>

          <div className='w-full flex items-center justify-evenly'>
            <button onClick={() => setToggle2(false)} className='bg-red-500 px-4 py-1'>Cancel</button>
            <button onClick={(e) => {
              handleJobTypes(e, "range")
              setToggle2(false)
            }} className='bg-yellow-500 px-4 py-1'>Get</button>
          </div>


        </div>

      </div>}


      {/* JOB SEARCH COMPONENT */}
      {showSearch && <Search type='job' hide={setShowSearch} />}

    </>
  )
}

export default Job
