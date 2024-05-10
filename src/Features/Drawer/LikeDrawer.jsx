import React, { useEffect, useState } from 'react'
import dp from '../../assets/dp.svg'
import { useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectLikeDrawer } from '../../Pages/Community/communitySlice';

const LikeDrawer = () => {

    const navigate = useNavigate()
    const likeDrawer = useSelector(selectLikeDrawer)

    const [toggle, setToggle] = useState("left-[100vw]")

    const handleHideDrawer = () => {
        setToggle("left-[100vw]")
    }

    const handleNavigateProfile = (userId) => {
        setToggle("left-[100vw]")
        navigate(`/profile/${userId}`)
    }

    // console.log(likeDrawerData);


    useEffect(() => {

        if (likeDrawer?.show == true) {
            setToggle("left-[0vw]")
        } else {
            setToggle("left-[100vw]")
        }

    }, [likeDrawer])

    // console.log(likeDrawer?.data);

    return (
        <div className={`transition-all duration-500 w-full h-[100vh] fixed top-0 ${toggle} flex items-center justify-end pt-[60px] z-[60]`} onClick={handleHideDrawer}>

            <div onClick={e => e.stopPropagation()} className='w-[250px] h-full bg-teal-500 flex flex-col gap-5 px-2 py-1'>

                <h1 className='text-3xl h-[5%] text-white'>Liked By</h1>

                {likeDrawer?.data?.likes.length > 0 ? <div className='h-[95%] overflow-scroll flex flex-col justify-start items-start'>

                    {likeDrawer?.data?.likes.map((e) => (
                        <div onClick={()=>handleNavigateProfile(e._id)} className='flex justify-start items-center'>

                            <img src={dp} alt="" srcSet="" />
                            <p>{e.name}</p>

                        </div>
                    ))}

                </div> : "NO LIKES"}


            </div>

        </div>
    )
}

export default LikeDrawer
