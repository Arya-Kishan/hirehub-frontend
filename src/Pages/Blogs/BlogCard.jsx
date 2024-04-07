import React, { useState } from 'react'
import edit from "../../assets/pencil.svg"
import remove from "../../assets/delete.svg"
import cross from "../../assets/cross.svg"
import threeDot2 from "../../assets/threeDot2.svg"
import dayjs from "dayjs"
import { useNavigate, useParams } from 'react-router-dom'
import { selectUserId } from '../User/userSlice'
import { useSelector, useDispatch } from "react-redux"
import { deleteBlogAsync, selectBlogs, setBlogDrawer } from './blogsSlice'


const BlogCard = ({ blog }) => {

    const [toggle, setToggle] = useState("-top-10")

    const loggedInUserId = useSelector(selectUserId)
    const blogs = useSelector(selectBlogs)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(setBlogDrawer({ show: true, data: blog }))
    }

    const handleDelete = (blogId) => {
        console.log(blogId);
        dispatch(deleteBlogAsync(blogId))
    }


    return (
        <div className='w-[250px] md:w-[300px] h-[20vh] bg-teal-500 rounded-2xl relative overflow-hidden flex flex-col flex-shrink-0 justify-between p-1 text-white'>

            {/* HEADING NAME,DP OF BLOG */}
            <div className='flex items-center justify-between pr-2 text-black text-xl'>

                <div onClick={() => navigate(`/profile/${blog.userId._id}`)} className='flex items-center gap-2'>
                    <img className='w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full' src={blog.userId.profilePic} alt="" srcSet="" draggable={"false"} />
                    <p className='text-[16px] md:text-xl'>{blog.userId.name}</p>
                </div>

                {window.location.pathname.includes("profile") && (loggedInUserId == blog.userId._id) && <img onClick={() => setToggle("top-0")} className='w-[15px] -rotate-90' src={threeDot2} alt="" srcSet="" />}

            </div>

            <div className='pl-2 h-full text-[14px] md:text-[16px] md:text-1xl'>{blog.description}</div>

            <div className='w-full text-end text-[14px]'>{dayjs(blog.createdAt).format("DD MMM")}</div>

            {/* OPTION SLIDER FOR EDIT DELETE BLOG OPTIONS */}
            <div className={`w-full justify-between bg-teal-500 p-2 absolute ${toggle} left-0 flex transition-all duration-700`}>

                <img onClick={() => handleEdit()} className='w-[20px]' src={edit} alt="" srcSet="" />

                <img onClick={() => handleDelete(blog._id)} className='w-[20px]' src={remove} alt="" srcSet="" />

                <img onClick={() => setToggle("-top-10")} className='w-[20px]' src={cross} alt="" srcSet="" />

            </div>

        </div>
    )
}

export default BlogCard
