import React, { useLayoutEffect, useRef } from 'react'
import group2 from '../../../assets/group2.svg'
import cap from '../../../assets/cap.svg'
import mind from '../../../assets/mind.svg'
import play from '../../../assets/play.svg'
import training from '../../../assets/training.svg'

const arr = [
  {
    pic: cap,
    title: "Grab a reliable Job",
    desc: "Job from your comform opening doors to world of possibilities",
    color: "yellow"
  },
  {
    pic: training,
    title: "Regular Guidance",
    desc: "Chance to get regular updates and reliable notification for quick and effective way",
    color: "teal"
  },
  {
    pic: play,
    title: "Join Community",
    desc: "Explore our community ,connect with different candidates and be friends",
    color: "teal"
  },
  {
    pic: mind,
    title: "Immerse yourself",
    desc: "Immerse yourself in knowledge with industry experts offering visual experience",
    color: "yellow"
  },
]

const Second = () => {

  return (
    <div className='w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center bg-white px-2 py-6 gap-4'>

      <div className='w-full md:w-[50%] flex justify-center items-center'>
        <img className='w-[300px] md:w-[450px] opacity-1' src={group2} alt="" srcSet="" />
      </div>

      <div className='w-full md:w-[50%] flex flex-col gap-8 justify-center items-start p-2'>

        <h1 className='w-full text-center md:text-start font-extrabold text-3xl md:text-4xl mb-6'><span className='text-teal-500'>Benefits</span> from our Job Portal</h1>

        {arr.map((e, i) => (
          <div key={i} className='flex items-center justify-start gap-5'>

            <img className={`w-[50px] md:w-[70px] bg-${e.color}-500 p-3 rounded-full`} src={e.pic} alt="" srcSet="" />

            <p className='flex flex-col'>
              <span className='text-xl md:text-2xl font-semibold'>{e.title}</span>
              <span>{e.desc}</span>
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Second
