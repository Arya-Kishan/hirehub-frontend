import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogAsync, selectBlogs } from './blogsSlice'
import BlogCard from './BlogCard'


const Blogs = () => {

    const dispatch = useDispatch()
    const blogs = useSelector(selectBlogs)

    console.log(blogs);

    useEffect(() => {
        dispatch(getAllBlogAsync())
    }, [])


    return (
        <div className='w-full pt-[70px] flex flex-col gap-4 p-4'
        >
            <h1 className='text-2xl'>BLOGS</h1>

            <div className='w-full flex flex-col md:flex-row items-center md:items-start flex-wrap gap-5 overflow-hidden'>
                {blogs?.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>

        </div>
    )
}

export default memo(Blogs)
