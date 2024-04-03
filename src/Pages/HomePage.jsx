import React from 'react'
import Banner from './Banner/component/Banner'
import Second from './HomePage/components/Second'
import Third from './HomePage/components/Third'
import Fourth from './HomePage/components/Fourth'
import Fifth from './HomePage/components/Fifth'
import Sixth from './HomePage/components/Sixth'
import Footer from './Footer/Footer'
import Navbar from './Navbar/component/Navbar'

const HomePage = () => {

  console.log("HOME APGE");
  return (
    <>
      <Banner />
      <Second />
      <Third />
      <Fourth />
      <Fifth />
      <Sixth />
      <Footer />
    </>
  )
}

export default HomePage
