import React, { memo, useEffect, useState } from 'react'
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

  // console.log(postArr);

  return (
    <div className='w-full min-h-[100vh] flex flex-col justify-center items-center py-5'>

      {/* Forst Row */}
      <h1 className='w-full h-[5vh] text-4xl text-center font-bold'>Community</h1>

      {/* third Row */}
      <div className='w-full min-h-[80vh] flex flex-wrap items-start justify-center md:justify-start gap-10 px-5 py-10'>

        {postArr ? postArr.slice(0,6)?.map((e, i) => (
          <div key={i}>
            <Card card={e} />
          </div>
        )) : <Loader />}

      </div>

      {showSearch && <Search type='user' hide={setShowSearch} />}

    </div>
  )
}

export default memo(Community)
