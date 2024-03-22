import React, { useEffect, useState } from 'react'
import filter from '../../../assets/filter.svg'
import search from '../../../assets/search.svg'
import dp from '../../../assets/dp.svg'
import add from '../../../assets/add.svg'
import Card from '../../../Features/Card'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostAsync, selectUserPosts } from '../communitySlice'
import Loader from '../../../Features/Loader'
import Search from '../../Search/component/Search'

const Community = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const postArr = useSelector(selectUserPosts)
  const [showSearch, setShowSearch] = useState(null)

  const handleCreatePost = () => {
    navigate("/postForm")
  }

  useEffect(() => {
    dispatch(fetchPostAsync())
  }, [])

  console.log(postArr);

  return (
    <div className='w-full min-h-[100vh] flex flex-col justify-center items-center py-5'>

      {/* Forst Row */}
      <h1 className='w-full h-[5vh] text-4xl text-center font-bold'>Community</h1>

      {/* Second Row */}
      <div className='w-[90%] h-[10vh] flex justify-between items-center p-2'>

        <div className='w-[20%] lg:w-[10%] p-2 flex items-center justify-evenly bg-teal-500 rounded-lg'>
          <img className='w-[25px]' src={filter} alt="" srcSet="" />
        </div>

        <div className='w-[60%] lg:w-[30%] flex items-center justify-evenly border-4 border-solid border-teal-500 rounded-lg'>
          <input onFocus={() => setShowSearch(true)} className='w-[90%]' type="text" placeholder='Add Friend...' />
          <img className='w-[25px]' src={search} alt="" srcSet="" />
        </div>

      </div>

      {/* third Row */}
      <div className='w-full min-h-[80vh] flex flex-wrap items-start justify-start gap-10 px-5 py-10'>

        {postArr ? postArr?.map((e, i) => (
          <div key={i}>
            <Card card={e} />
          </div>
        )) : <Loader />}

      </div>

      {/* Fourth Row */}
      <div className='w-[90%] h-[5vh] flex items-center justify-center lg:justify-between px-5 py-2'>

        <div onClick={() => handleCreatePost()} className='w-[200px] h-[50px] flex items-center justify-center gap-2 bg-teal-500 px-5 py-2 rounded-lg'>
          <img className='w-[25px]' src={add} alt="" srcSet="" />
          <p>Create Post</p>
        </div>

        <div className='w-[200px] h-[50px] hidden lg:flex items-center justify-center bg-teal-500 px-5 py-2 rounded-lg'>
          <p>Load More</p>
        </div>

      </div>

      {showSearch && <Search type='user' hide={setShowSearch} />}

    </div>
  )
}

export default Community
