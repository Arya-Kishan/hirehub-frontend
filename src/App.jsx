import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const HomePage = lazy(() => import("./Pages/HomePage"))
const Profile = lazy(() => import('./Pages/Profile/component/Profile'))
const Login = lazy(() => import('./Pages/User/component/Login'))
const Job = lazy(() => import('./Pages/Job/component/Job'))
const JobDetails = lazy(() => import('./Pages/Job/component/JobDetails'))
const MultiForm = lazy(() => import('./Features/MultiForm'))
const ApplicationForm = lazy(() => import('./Pages/Forms/component/ApplicationForm'))
const PostForm = lazy(() => import('./Pages/Forms/component/PostForm'))
const JobForm = lazy(() => import('./Pages/Forms/component/JobForm'))
const Protected = lazy(() => import('./Features/Protected'))
const CommunityHome = lazy(() => import('./Pages/Community/component/CommunityHome'))
const Application = lazy(() => import('./Pages/Application/component/Application'))

import Navbar from "./Pages/Navbar/component/Navbar"
import LikeDrawer from "./Features/Drawer/LikeDrawer"
import CommentDrawer from "./Features/Drawer/CommentDrawer"

import { useDispatch, useSelector } from 'react-redux'
import { checkUserWithJwtAsync, selectLoggedInUser, selectPreCheckUser } from './Pages/User/userSlice'
import Loader from './Features/Loader'
import PostDrawer from './Features/Drawer/PostDrawer'
import Dialog from './Features/Dialog/Dialog'
import BlogDrawer from './Features/Drawer/BlogDrawer'
import UpdateProfileForm from './Pages/Forms/component/UpdateProfileForm'
import Community from './Pages/Community/component/Community'
import SavedJobs from './Pages/Job/component/SavedJobs'

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
          {loggedInUser && <Navbar />}
          <Suspense fallback={<Loader />} >
            <Routes>
              <Route path='/' element={<Protected><HomePage /></Protected>} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile/:userId' element={<Protected><Profile /></Protected>} />
              <Route path='/job' element={<Protected><Job /></Protected>} />
              <Route path='/savedJob/:type' element={<Protected><SavedJobs /></Protected>} />
              <Route path='/jobDetails/:id' element={<Protected><JobDetails /></Protected>} />
              <Route path='/multiform/:type' element={<Protected><MultiForm /></Protected>} />
              <Route path='/applicationForm' element={<Protected><ApplicationForm /></Protected>} />
              <Route path='/jobForm' element={<Protected><JobForm /></Protected>} />
              <Route path='/postForm' element={<Protected><PostForm /></Protected>} />
              <Route path='/profileForm' element={<Protected><UpdateProfileForm /></Protected>} />
              <Route path='/community' element={<Protected><Community /></Protected>} />
              <Route path='/communityHome' element={<Protected><CommunityHome /></Protected>} />
              <Route path='/application' element={<Protected><Application /></Protected>} />
            </Routes>
          </Suspense>
          {loggedInUser && <>
            <LikeDrawer />
            <CommentDrawer />
            <PostDrawer />
            <Dialog />
            <BlogDrawer />
          </>}
        </BrowserRouter>
      }
    </>
  )
}

export default App
