import React, { useEffect, useState } from 'react'
import heart from "../../../assets/heart.svg"
import { useDispatch, useSelector } from "react-redux"
import { getApplicationAsync, selectApplications } from '../applicationSlice';
import { selectLoggedInUser, selectUserId } from '../../User/userSlice';
import Loader from '../../../Features/Loader';
import Navbar from '../../Navbar/component/Navbar';

const Application = () => {

  const dispatch = useDispatch();
  const applications = useSelector(selectApplications);
  const userId = useSelector(selectUserId);
  const loggedInUser = useSelector(selectLoggedInUser);

  const [bigImg, setBigImg] = useState({ show: false, pic: "" })

  const showBigImage = (pic) => {
    setBigImg({ show: true, pic: pic })
  }

  const hideBigImage = (pic) => {
    setBigImg({ show: false, pic: "" })
  }

  console.log(applications);
  console.log(userId);

  useEffect(() => {
    // USED APPLICANT_ID TO GET MINE APPLICATION WHICH I APPLY FOR JOB
    // USED EMPLOYER_ID TO GET APPLICATION WHICH OTHER APPLICANT APPLY FOR JOB POSTED BY ME
    if (loggedInUser.role == "applicant") {
      dispatch(getApplicationAsync({ id: userId, query: "applicantId" }));
    } else {
      dispatch(getApplicationAsync({ id: userId, query: "employerId" }));
    }
  }, [])

  return (
    <>
      <div className='w-full h-dvh py-[70px] flex flex-col justify-start items-center gap-2'>

        <h1 className='w-full h-[5vh] uppercase text-4xl text-center font-bold'>Application</h1>

        {applications ? applications.map((e) => (
          <div key={e._id} className='w-[90%] lg:w-[60%] flex flex-col md:flex-row justify-between items-center gap-20 py-10 px-4 shadow-lg'>

            <div className='flex flex-col items-start justify-center gap-4'>

              <p><b>Name : </b>{e.name}</p>
              <p><b>Email : </b>{e.email}</p>
              <p><b>Phone : </b>{e.phone}</p>
              <p><b>Address : </b>{e.address}</p>
              <p><b>Cover Letter : </b>{e.coverLetter}</p>

            </div>

            <div className='flex items-center justify-center bg-teal-600'>
              <img onClick={() => showBigImage(e.resume)} className='w-[200px]' src={e.resume} alt="" srcSet="" />
            </div>

            {bigImg.show && <div onClick={hideBigImage} className='fixed top-0 left-0 w-full h-full bg-gradient-to-r from-black'>
              <img className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[100px] lg:w-[350px]' src={bigImg.pic} alt="" srcSet="" />
            </div>}

          </div>
        )) : <Loader />}

      </div>
    </>
  )
}

export default Application
