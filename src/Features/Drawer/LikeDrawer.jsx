import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import dp from '../../assets/dp.svg'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectLikeDrawer, selectLikeDrawerData, setLikeDrawer } from '../../Pages/Community/communitySlice';

const LikeDrawer = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const likeDrawer = useSelector(selectLikeDrawer)
    const likeDrawerData = useSelector(selectLikeDrawerData)

    const [width, setWidth] = useState(0)

    const handleHideDrawer = () => {
        dispatch(setLikeDrawer(false))
    }

    const handleNavigateProfile = (userId) => {
        navigate(`/profile/${userId}`)
        dispatch(setLikeDrawer(false))
    }

    // console.log(likeDrawerData);


    useEffect(() => {

        if (likeDrawer == true) {
            setWidth('-100vw')
        } else {
            setWidth('100vw')
        }

    }, [likeDrawer])

    // console.log(likeDrawer);

    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: width }}
            className='w-full h-[100vh] fixed top-0 left-[100vw] flex items-center justify-end pt-[60px] z-10'
            onClick={handleHideDrawer}
        >

            <div onClick={e => e.stopPropagation()} className='w-[250px] h-full bg-teal-500 flex flex-col gap-5 px-2 py-1'>

                <h1 className='text-3xl h-[5%] text-white'>Liked By</h1>

                {likeDrawerData?.likes.length > 0 ? <div className='h-[95%] overflow-scroll flex flex-col justify-start items-start'>

                    {likeDrawerData?.likes.map((e) => (
                        <div onClick={()=>handleNavigateProfile(e._id)} className='flex justify-start items-center'>

                            <img src={dp} alt="" srcSet="" />
                            <p>{e.name}</p>

                        </div>
                    ))}

                </div> : "NO LIKES"}


            </div>

        </motion.div>
    )
}

export default LikeDrawer
