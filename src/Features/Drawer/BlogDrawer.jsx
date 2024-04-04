import React, { useEffect, useRef } from 'react'
import { addBlogAsync, selectAddingBlogLoader, selectBlogDrawer, setAddingBlogLoader, setBlogDrawer, updateBlogAsync } from '../../Pages/Blogs/blogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../Pages/User/userSlice';
import loader from "../../assets/loader.svg"

const BlogDrawer = () => {

    const textareaRef = useRef("")

    const dispatch = useDispatch()

    const loggedInUserId = useSelector(selectUserId)
    const BlogDrawer = useSelector(selectBlogDrawer)
    const addingBlogLoader = useSelector(selectAddingBlogLoader)

    console.log(BlogDrawer)
    console.log(addingBlogLoader)


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

    useEffect(() => {
        if (addingBlogLoader.result == "success") {
            dispatch(setBlogDrawer({ show: false, data: "" }))
            textareaRef.current.value = ""

            setTimeout(() => {
                dispatch(setAddingBlogLoader({ result: null, loader: "idle" }))
            }, 500);
        }
    }, [addingBlogLoader])

    return (
        <div onClick={hideBlogDrawer} className={`w-full h-[100vh] transition-all duration-700 fixed ${BlogDrawer?.show ? "top-[0vh]" : "top-[100vh]"} left-0 flex items-end justify-end`}>

            <div onClick={(e) => e.stopPropagation()} className='w-full h-[40vh] flex flex-col mb-[46px] md:mb-[0px] border-2 border-gray-800'>

                <textarea ref={textareaRef} name="" id="" className='w-full h-[90%] p-2' placeholder='Write Your Blog...'></textarea>

                {addingBlogLoader.loader == "loading" ? <div className='w-full h-[10%] flex items-center justify-center bg-teal-800'><img className='w-[30px]' src={loader} alt="" srcset="" /></div> : <button className='w-full h-[10%] flex items-center justify-center bg-teal-500 hover:bg-teal-600'>{BlogDrawer.data ? <p onClick={updateBlog}>Update</p> : <p onClick={addBlog}>Add</p>}</button>}

            </div>

        </div>
    )
}

export default BlogDrawer

// USING THIS BLOG DRAWER FOR BOTH ADDING AND UPDATING BLOG
