import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
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
import Drawer from './Features/Drawer'
import LikeDrawer from './Features/Drawer/LikeDrawer'
import CommentDrawer from './Features/Drawer/CommentDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserWithJwtAsync, selectLoggedInUser, selectPreCheckUser } from './Pages/User/userSlice'

function App() {

  // BELOW CODE SETS THE AXIOS HEADER
  axios.defaults.headers.common["x-jwt-routes"] = `${localStorage.getItem("x-jwt-routes")}`

  const dispatch = useDispatch()


  const loggedInUser = useSelector(selectLoggedInUser)
  const preCheckUser = useSelector(selectPreCheckUser)

  useEffect(() => {
    dispatch(checkUserWithJwtAsync(localStorage.getItem("x-jwt-routes")))
  }, [])


  return (
    <>
      {preCheckUser &&

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Protected><HomePage /></Protected>} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:userId' element={<Protected><Profile /></Protected>} />
            <Route path='/job' element={<Protected><Job /></Protected>} />
            <Route path='/jobDetails/:id' element={<Protected><JobDetails /></Protected>} />
            <Route path='/multiform/:type' element={<Protected><MultiForm /></Protected>} />
            <Route path='/applicationForm' element={<Protected><ApplicationForm /></Protected>} />
            <Route path='/jobForm' element={<Protected><JobForm /></Protected>} />
            <Route path='/postForm' element={<Protected><PostForm /></Protected>} />
            <Route path='/community' element={<Protected><CommunityHome /></Protected>} />
            <Route path='/application' element={<Protected><Application /></Protected>} />
          </Routes>
          <Drawer />
          <LikeDrawer />
          <CommentDrawer />
        </BrowserRouter>
      }
    </>
  )
}

export default App
