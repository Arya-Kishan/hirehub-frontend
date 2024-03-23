// Used selectDrawer from formSlice for opening and closing drawer and used selectDrawerData from formSlice getting data for drawer

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDrawer, selectDrawerData, setDrawer, setDrawerData } from '../Pages/Forms/formsSlice'
import { motion } from "framer-motion";
import dp from '../assets/dp.svg'
import remove from '../assets/delete2.svg'
import send1 from '../assets/send1.svg'
import send2 from '../assets/send2.svg'
import arrow from '../assets/arrow.svg'
import { useNavigate } from "react-router-dom"
import { selectUserId } from '../Pages/User/userSlice';
// import { addRemoveLikeCommentAsync } from '../Pages/Community/communitySlice';

const Drawer = () => {

    const [height, setHeight] = useState(0)
    const drawer = useSelector(selectDrawer)
    const drawerData = useSelector(selectDrawerData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const commentInputRef = useRef(null)
    const userId = useSelector(selectUserId)


    const handleHideDrawer = () => {
        dispatch(setDrawer(false))
    }

    const handleShowProfile = (userId) => {
        console.log(userId);
        dispatch(setDrawer(false))
        navigate(`/profile/${userId}`)
    }

    const handleAddComment = (postId) => {
        // console.log("ADDING LIKE");
        // console.log("POST_ID", postId);
        // console.log("USER_ID", userId);
        // console.log(commentInputRef.current.value);
        dispatch(addRemoveLikeCommentAsync({ query: `purpose=add&type=comment&userId=${userId}&postId=${postId}&comment=${commentInputRef.current.value}` }))
    }

    const handleDeleteComment = (postId, comment) => {
        // console.log("ADDING LIKE");
        // console.log("POST_ID", postId);
        // console.log("USER_ID", userId);
        // console.log(commentInputRef.current.value);
        dispatch(addRemoveLikeCommentAsync({ query: `purpose=delete&type=comment&userId=${userId}&postId=${postId}&comment=${comment}` }))
    }

    useEffect(() => {

        if (drawer == true) {
            setHeight('-100vh')
        } else {
            setHeight('0vh')
        }

    }, [drawer])

    // console.log(drawerData);


    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: height }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            onClick={() => handleHideDrawer()}
            className='fixed -bottom-[100vh] left-0 w-full h-[100vh] flex flex-col justify-end items-center bg-gradient-to-r from-teal-800'
        >



        </motion.div>
    )
}

export default Drawer
