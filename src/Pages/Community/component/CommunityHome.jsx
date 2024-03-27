import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import search from "../../../assets/search.svg"
import add from "../../../assets/add.svg"
import Card from '../../../Features/Card'
import Loader from '../../../Features/Loader'
import { fetchPostAsync, selectUserPosts } from '../communitySlice'
import Search from '../../Search/component/Search'
import Blogs from '../../Blogs/Blogs'
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import { getAllBlogAsync, selectBlogs } from '../../Blogs/blogsSlice'


const CommunityHome = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const posts = useSelector(selectUserPosts)
    const blogs = useSelector(selectBlogs)
    const [showSearch, setShowSearch] = useState(null)

    useEffect(() => {
        dispatch(fetchPostAsync())
        dispatch(getAllBlogAsync())
    }, [])

    console.log(posts);
    console.log(blogs);

    return (
        <div className='w-full min-h-[100vh] flex flex-col items-center justify-center py-[70px]'>

            {/* SEARCH AND TITLE */}
            <div className='w-[90%] min-h-[10vh] flex justify-between items-center gap-2'>
                <h1 className='text-3xl font-bold text-teal-500'>Community</h1>
                <div className='flex items-center justify-start lg:border-2 lg:border-solid lg:border-black rounded-lg'>
                    <input onFocus={() => setShowSearch(true)} className='hidden lg:block w-full rounded-lg' type="text" placeholder='Search Friends...' />
                    <img onClick={() => setShowSearch(true)} className='w-[25px] cursor-pointer' src={search} alt="" srcSet="" />
                </div>
            </div>

            {/* Blogs */}

            <Swiper
                slidesPerView={window.innerWidth > '500' ? 4 : 1.5}
                spaceBetween={10}
                className="w-full h-full"
            >
                {blogs?.map((e) => (
                    <SwiperSlide key={e._id}><Blogs blog={e} /></SwiperSlide>
                ))}
            </Swiper>

            {/* CARDS OR POSTS */}
            <div className='w-full min-h-[90vh] flex flex-wrap justify-center items-center gap-6'>
                {posts ? <>

                    {posts.map((e, i) => (<Card key={i} card={e} />))}

                </> : <Loader />}
            </div>

            {showSearch && <Search type='user' hide={setShowSearch} />}

            {/* button to create user new post */}
            <button onClick={() => navigate("/postForm")} className='fixed bottom-[60px] right-2 z-2'>
                <img className='w-[40px] bg-teal-400 p-1 rounded-lg' src={add} alt="" srcSet="" />
            </button>

        </div>
    )
}

export default CommunityHome
