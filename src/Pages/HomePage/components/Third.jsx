import React from 'react'
import person1 from '../../../assets/person1.svg'
import person2 from '../../../assets/person2.svg'
import person3 from '../../../assets/person3.svg'
import person4 from '../../../assets/person4.svg'
import person5 from '../../../assets/person5.svg'
import person6 from '../../../assets/person6.svg'
import happy from '../../../assets/happy.svg'
import { useNavigate } from "react-router-dom"

const Third = () => {

    const navigate = useNavigate()
    
    return (
        <div className='w-full h-[40vh] md:h-[70vh] flex justify-center items-center relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-800'>

            <div className='w-[80%] md:w-[50%] h-[150px] md:h-[300px] flex flex-col justify-evenly items-center bg-white shadow-inner shadow-black rounded-2xl relative z-[10]'>
                <img className='w-[50px] md:w-[100px] absolute top-[0%] left-[50%] -translate-x-[50%] -translate-y-[50%]' src={person3} alt="" />
                <p></p>
                <p className='w-[80%] text-center'>Discover innovative job portal app development ideas for startups.<span className='hidden md:block'> From remote work hubs to gamified learning, these concepts can revolutionize the employment landscape and launch your business to success</span></p>
                <button onClick={() => navigate("/community")} className='text-[14px] md:text-xl bg-teal-500 px-5 py-2 rounded-xl hover:text-white'>Explore</button>
                <img className='w-[35px] md:w-[80px] absolute top-[80%] left-[95%]' src={happy} alt="" />
            </div>

            <img className='z-[5] w-[35px] md:w-[80px] absolute top-[60%] -left-[30px]' src={person1} alt="" />
            <img className='z-[5] w-[35px] md:w-[80px] absolute top-[20%] left-[10%]' src={person2} alt="" />
            <img className='z-[5] w-[35px] md:w-[80px] absolute top-[80%] left-[12%]' src={person3} alt="" />

            <img className='z-[5] w-[35px] md:w-[80px] absolute top-[40%] right-[10%]' src={person4} alt="" />
            <img className='z-[5] w-[35px] md:w-[80px] absolute top-[15%] right-[20%]' src={person5} alt="" />
            <img className='z-[5] w-[35px] md:w-[80px] absolute top-[10%] -right-[30px]' src={person6} alt="" />

        </div>
    )
}

export default Third
