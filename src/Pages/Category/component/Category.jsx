import React from 'react'
import atlassian from "../../../assets/atlassian.svg"
import amazon from "../../../assets/amazon.svg"
import shopify from "../../../assets/shopify.svg"
import facebook from "../../../assets/facebook.svg"
import apple from "../../../assets/apple.svg"
import code from "../../../assets/code.svg"
import nuxt from "../../../assets/nuxt.svg"
import database from "../../../assets/database.svg"
import { useNavigate } from "react-router-dom"

const boxArr = [
  {
    pic: code,
    details: "Front-end web development is the process of building the graphical user interface (GUI) of a website using HTML, CSS, and JavaScript. This allows users to view and interact with the website."
  },
  {
    pic: nuxt,
    details: "Back-end development, also known as server-side development, is the process of creating the logic that powers web applications. It focuses on the server-side of a website, including databases, servers etc."
  },
  {
    pic: database,
    details: "Database development is the process of creating a database or data model, and analyzing requirements and their intents as raw data. The goal is to create a structure for storing data."
  }
];

const companyArr = [{ pic: facebook, title: 'Facebook' }, { pic: apple, title: 'Apple' }, { pic: amazon, title: 'Amazon' }, { pic: shopify, title: 'Shopify' }, { pic: atlassian, title: 'Atlassian' }];

const Category = () => {

  const navigate = useNavigate()

  return (
    <div className='w-full min-h-[100vh]'>

      <div className='w-full h-[20vh] flex items-center justify-around gap-2'>

        {companyArr.map((e, i) => (
          <div key={i} className={`w-[150px] lg:w-[200px] ${i > 1 ? "hidden" : "flex"} lg:flex gap-2 justify-evenly items-center shadow-lg`}>
            <img className='w-[50px]' src={e.pic} alt="" srcSet="" />
            <p>{e.title}</p>
          </div>
        ))}

      </div>

      <div className='w-full min-h-[70vh] flex items-center justify-center pb-5'>

        <div className='flex flex-wrap items-center justify-around gap-5'>

          {boxArr.map((e, i) => (
            <div key={i} className='w-[80%] md:w-[25vw] flex flex-col gap-5 items-center justify-around shadow-2xl p-5 border-2 border-gray-200'>
              <img src={e.pic} alt="" srcSet="" />
              <p>{e.details}</p>
              <button onClick={() => navigate("/job")} className='text-teal-500'>Explore</button>
            </div>
          ))}

        </div>


      </div>

      <div className='hidden w-[95%] h-[10vh] lg:flex items-center justify-end'>
        <button className='bg-teal-500 px-12 py-4'>More</button>
      </div>


    </div>
  )
}

export default Category
