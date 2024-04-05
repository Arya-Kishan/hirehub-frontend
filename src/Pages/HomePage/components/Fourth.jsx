import React, { useLayoutEffect, useRef } from 'react'
import bigImg3 from "../../../assets/bigImg3.svg"
import circle1 from "../../../assets/circle1.svg"
import circle2 from "../../../assets/circle2.svg"
import triangle1 from "../../../assets/triangle1.svg"
import triangle2 from "../../../assets/triangle2.svg"
import cube1 from "../../../assets/cube1.svg"
import star1 from "../../../assets/star1.svg"
import increase from "../../../assets/increase.svg"
import communicate from "../../../assets/communicate.svg"
import search from "../../../assets/search.svg"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger";

const arr = [
    {
        pic: increase,
        title: "Enhance Your Career",
        desc: "Career prospective choosing right direction must be taken ",
        color: "yellow"
    },
    {
        pic: communicate,
        title: "Communucate with others",
        desc: "Connect with candidate having same interest as yours",
        color: "teal"
    },
    {
        pic: search,
        title: "Find Jobs and Career",
        desc: "Helps in finding whoch you prefer in your ease online ",
        color: "yellow"
    }
]


const Fourth = () => {


    gsap.registerPlugin(ScrollTrigger)

    const parentRef = useRef()
  
    useLayoutEffect(() => {
  
      const ctx1 = gsap.context(() => {
  
        let t1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".pic",
            // markers: true,
            start: "0% 100%",
            end: "30% 100%",
            scrub: 2,
          }
        })
          .from(".pic", {
            opacity:0,
            scale:0.8,
          }, 'a')
  
          let t2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".desc",
            //   markers: true,
              start: "0% 80%",
              end: "100% 60%",
              scrub: 2,
            }
          })
            .from(".desc", {
              opacity:0,
              x:-50,
              stagger:0.5,
              duration:1,
            }, 'a')
  
  
      }, parentRef)
  
      return () => ctx1.revert();
  
    }, [])

    return (
        <div ref={parentRef} className='w-full min-h-[100vh] flex flex-col md:flex-row justify-center items-center'>

            <div className='w-full md:w-[50%] flex justify-center items-center p-2'>
                <img className='w-[250px] md:w-[400px] pic' src={bigImg3} alt="" srcSet="" />
            </div>

            <div className='w-full md:w-[50%] flex flex-col gap-8 justify-center items- px-4 py-2'>

                <h1 className='w-full text-center md:text-start font-extrabold text-3xl md:text-4xl mb-6'>We always help to help you <span className='text-teal-500'>win</span></h1>

                {arr.map((e,i) => (
                    <div key={i} className='flex items-center justify-start gap-5 desc'>

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

export default Fourth
