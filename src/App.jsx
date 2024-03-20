import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile/component/Profile'
import Login from './Pages/User/component/Login'
import Navbar from './Pages/Navbar/component/Navbar'
import Job from './Pages/Job/component/Job'
import JobDetails from './Pages/Job/component/JobDetails'
import MultiForm from './Features/MultiForm'
import ApplicationForm from './Pages/Forms/component/ApplicationForm'
import PostForm from './Pages/Forms/component/PostForm'
import JobForm from './Pages/Forms/component/JobForm'
import Protected from './Features/Protected'
import CommunityHome from './Pages/Community/component/CommunityHome'
import Application from './Pages/Application/component/Application'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Protected><HomePage /></Protected>} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/job' element={<Job />} />
          <Route path='/jobDetails/:id' element={<JobDetails />} />
          <Route path='/multiform/:type' element={<MultiForm />} />
          <Route path='/applicationForm' element={<ApplicationForm />} />
          <Route path='/jobForm' element={<JobForm />} />
          <Route path='/postForm' element={<PostForm />} />
          <Route path='/community' element={<CommunityHome />} />
          <Route path='/application' element={<Application />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
