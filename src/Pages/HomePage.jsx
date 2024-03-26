import React from 'react'
import Banner from './Banner/component/Banner'
import Category from './Category/component/Category'
import Community from './Community/component/Community'
import axios from "axios"
import Footer from './Footer/Footer'

const HomePage = () => {

  console.log("HOME APGE");
  return (
    <>
      <Banner />
      <Category />
      <Community />
      <Footer/>
    </>
  )
}

export default HomePage
