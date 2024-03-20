import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import search from "../../../assets/search.svg"
import Card from '../../../Features/Card'
import Loader from '../../../Features/Loader'
import { fetchPostAsync, selectUserPosts } from '../communitySlice'
import Search from '../../Search/component/Search'


const CommunityHome = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const posts = useSelector(selectUserPosts)
    const [showSearch, setShowSearch] = useState(null)

    useEffect(() => {
        dispatch(fetchPostAsync())
    }, [])

    console.log(posts);

    return (
        <div className='w-full min-h-[100vh] flex flex-col items-center justify-center py-[70px]'>

            <div className='w-[90%] min-h-[10vh] flex justify-between items-center gap-2'>
                <h1 className='text-3xl font-bold text-teal-500'>Community</h1>
                <div className='flex items-center justify-start border-2 border-solid border-black rounded-lg'>
                    <input onFocus={() => setShowSearch(true)} className='w-full rounded-lg' type="text" placeholder='Search Friends...' />
                    <img className='w-[25px] cursor-pointer' src={search} alt="" srcSet="" />
                </div>
            </div>

            <div className='w-full min-h-[90vh] flex flex-wrap gap-6'>
                {posts ? <>

                    {posts.map((e, i) => (<Card key={i} card={e} />))}

                </> : <Loader />}
            </div>

            {showSearch && <Search type='user' hide={setShowSearch} />}

        </div>
    )
}

export default CommunityHome
