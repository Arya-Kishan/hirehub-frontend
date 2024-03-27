import React, { useRef, useState } from 'react'
import dp from "../../assets/dp.svg"
import edit from "../../assets/pencil.svg"
import remove from "../../assets/delete.svg"
import cross from "../../assets/cross.svg"
import threeDot2 from "../../assets/threeDot2.svg"
import { useDispatch } from 'react-redux'
import dayjs from "dayjs"
import { deleteBlogAsync, setBlogDrawer } from './blogsSlice'


const Blogs = ({ blog }) => {

    const [toggle, setToggle] = useState(10)
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(setBlogDrawer({ show: true, data: blog }))
    }

    const handleDelete = (blogId) => {
        console.log(blogId);
        dispatch(deleteBlogAsync(blogId))
    }


    return (
        <div className='w-full h-[150px] bg-yellow-500 relative overflow-hidden flex flex-col justify-between p-1 text-white'>

            <div className='flex items-center justify-between pr-2 text-black text-xl'>

                <div className='flex items-center'>
                    <img src={dp} alt="" srcSet="" />
                    <p>{blog.userId.name}</p>
                </div>

                <img onClick={() => setToggle(0)} className='w-[15px] -rotate-90' src={threeDot2} alt="" srcSet="" />

            </div>

            <div className='pl-2 h-full'>{blog.description}</div>

            <div className='w-full text-end'>{dayjs(blog.createdAt).format("DD MMM")}</div>

            <div className={`w-full justify-between bg-teal-500 p-2 absolute -top-${toggle} left-0 flex transition-all duration-700`}>

                <img onClick={() => handleEdit()} className='w-[20px]' src={edit} alt="" srcSet="" />

                <img onClick={() => handleDelete(blog._id)} className='w-[20px]' src={remove} alt="" srcSet="" />

                <img onClick={() => setToggle(10)} className='w-[20px]' src={cross} alt="" srcSet="" />

            </div>

        </div>
    )
}

export default Blogs
