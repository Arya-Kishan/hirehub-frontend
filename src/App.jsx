import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import io from "socket.io-client"

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
const PostDrawer = lazy(() => import("./Features/Drawer/PostDrawer"))
const Dialog = lazy(() => import("./Features/Dialog/Dialog"))
const BlogDrawer = lazy(() => import("./Features/Drawer/BlogDrawer"))
const UpdateProfileForm = lazy(() => import("./Pages/Forms/component/UpdateProfileForm"))
const Community = lazy(() => import("./Pages/Community/component/Community"))
const SavedJobs = lazy(() => import("./Pages/Job/component/SavedJobs"))
const ForgotPassword = lazy(() => import("./Pages/User/component/ForgotPassword"))
const ChangePassword = lazy(() => import("./Pages/User/component/ChangePassword"))
const Blogs = lazy(() => import("./Pages/Blogs/Blogs"))
const PaymentSuccess = lazy(() => import("./Pages/User/component/PaymentSuccess"))
const Chat = lazy(() => import("./Pages/Chat/component/Chat"))
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"))

import { setOnlineUsers, setSelectedUser } from './Pages/Chat/chatSlice'

export let globalSocket;

function App() {


  // BELOW CODE SETS THE AXIOS HEADER
  axios.defaults.headers.common["x-jwt-routes"] = `${localStorage.getItem("x-jwt-routes")}`

  const dispatch = useDispatch()


  const loggedInUser = useSelector(selectLoggedInUser)
  const preCheckUser = useSelector(selectPreCheckUser)

  useEffect(() => {
    dispatch(checkUserWithJwtAsync(localStorage.getItem("x-jwt-routes")))
  }, [])

  useEffect(() => {

    if (loggedInUser) {

      globalSocket = io("https://hirehub-socket.onrender.com", {
        query: {
          userId: loggedInUser._id,
        }

      });

      globalSocket?.on('onlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => {
        globalSocket.close();
        dispatch(setSelectedUser(null))
      }

    }

  }, [loggedInUser])




  return (
    <>
      {preCheckUser ?
        <BrowserRouter>
          {loggedInUser && <Navbar />}
          <Suspense fallback={<div className='w-full h-dvh flex justify-center items-center'><Loader /></div>} >
            <Routes>
              <Route path='/' element={<Protected><HomePage /></Protected>} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgotPassword' element={<ForgotPassword />} />
              <Route path='/changePassword' element={<ChangePassword />} />
              <Route path='/profile/:userId' element={<Protected><Profile /></Protected>} />
              <Route path='/job' element={<Protected><Job /></Protected>} />
              <Route path='/blogs' element={<Protected><Blogs /></Protected>} />
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
              <Route path='/success' element={<Protected><PaymentSuccess /></Protected>} />
              <Route path='/chat' element={<Protected><Chat /></Protected>} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <LikeDrawer />
            <CommentDrawer />
            <PostDrawer />
            <Dialog />
            <BlogDrawer />
          </Suspense>
        </BrowserRouter> : <div className='w-full h-dvh flex justify-center items-center'><Loader /></div>
      }
    </>
  )
}

export default App
