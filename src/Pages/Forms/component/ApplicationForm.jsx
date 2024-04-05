import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { addApplicationAsync } from '../../Application/applicationSlice';
import { selectUserId } from '../../User/userSlice';
import { toast } from 'react-toastify';
import { selectJobDetail } from '../../Job/jobSlice';

const ApplicationForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const jobDetail = useSelector(selectJobDetail);

  const handleForm = (data) => {

    let formData = new FormData();

    if (data.resume[0].size / 1024 > 50) {
      toast("UPLOAD IMAGE BELOW 50KB")
      return 0;
    } else {

      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('address', data.address)
      formData.append('coverLetter', data.coverLetter)
      formData.append('resume', data.resume[0])
      formData.append('jobId', jobDetail._id)
      formData.append('applicantId', userId)
      formData.append('employerId', jobDetail.postedBy)

      Object.keys(data).forEach((e) => {
        console.log(formData.get(e));
      })

      dispatch(addApplicationAsync(formData))

    }


  }

  useEffect(() => {

  }, [])

  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-start gap-2 py-[70px]'>

      <h1 className='w-full h-[10vh] text-center text-2xl'>APPLICATION FORM</h1>

      <form onSubmit={handleSubmit(handleForm)} className='w-[60%] min-h-[90vh] flex flex-col justify-start items-center gap-10' >

        {/* Name */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("name")} placeholder='Your Name' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.name && <p className='text-red'>{errors.name?.message}</p>}

        </div>

        {/* Email */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("email")} placeholder='Your Email' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.email && <p className='text-red'>{errors.email?.message}</p>}

        </div>

        {/* Phone */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("phone")} placeholder='Your Phone' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.phone && <p className='text-red'>{errors.phone?.message}</p>}

        </div>

        {/* Address */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("address")} placeholder='Your Address' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.address && <p className='text-red'>{errors.address?.message}</p>}

        </div>

        {/* CoverLetter */}
        <div className='w-full flex flex-col items-start justify-start'>

          <textarea rows="10" cols="50" {...register("coverLetter")} placeholder='Your Letter' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.coverLetter && <p className='text-red'>{errors.coverLetter?.message}</p>}

        </div>

        {/* Choose File or Resume */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="file" {...register("resume")} placeholder='Your Name' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.resume && <p className='text-red'>{errors.resume?.message}</p>}

        </div>

        <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Submit</button>

      </form>

    </div>
  )
}

export default ApplicationForm
