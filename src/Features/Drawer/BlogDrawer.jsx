import React, { useEffect, useRef } from 'react'
import { addBlogAsync, selectBlogDrawer, setBlogDrawer, updateBlogAsync } from '../../Pages/Blogs/blogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../Pages/User/userSlice';

const BlogDrawer = () => {

    const textareaRef = useRef("")

    const dispatch = useDispatch()

    const loggedInUserId = useSelector(selectUserId)
    const BlogDrawer = useSelector(selectBlogDrawer)

    console.log(BlogDrawer)


    const addBlog = () => {
        console.log(textareaRef.current.value);
        dispatch(addBlogAsync({ userId: loggedInUserId, description: textareaRef.current.value }));
        dispatch(setBlogDrawer({ show: false, data: "" }))
        textareaRef.current.value = ""
    }

    const updateBlog = () => {
        console.log(textareaRef.current.value);
        dispatch(updateBlogAsync({ data: { description: textareaRef.current.value }, blogId: BlogDrawer?.data._id }));
        dispatch(setBlogDrawer({ show: false, data: "" }))
        textareaRef.current.value = ""
    }

    const hideBlogDrawer = () => {
        dispatch(setBlogDrawer({ show: false, data: "" }))
        textareaRef.current.value = ""
    }

    useEffect(() => {
        BlogDrawer?.data?.description?.length > 2 ? (textareaRef.current.value = BlogDrawer?.data.description) : ""
    }, [BlogDrawer])

    return (
        <div onClick={hideBlogDrawer} className={`w-full h-[100vh] transition-all duration-700 fixed ${BlogDrawer?.show ? "top-[0vh]" : "top-[100vh]"} left-0 flex items-end justify-end`}>

            <div onClick={(e) => e.stopPropagation()} className='w-full h-[40vh] flex flex-col gap-2 mb-[46px] border-2 border-gray-300'>

                <textarea ref={textareaRef} name="" id="" className='w-full h-[90%] p-2' placeholder='Write Your Blog...'></textarea>

                <button className='w-full h-[10%] flex items-center justify-center bg-teal-800'>{BlogDrawer.data ? <p onClick={updateBlog}>Update</p> : <p onClick={addBlog}>Add</p>}</button>

            </div>

        </div>
    )
}

export default BlogDrawer

// USING THIS BLOG DRAWER FOR BOTH ADDING AND UPDATING BLOG
