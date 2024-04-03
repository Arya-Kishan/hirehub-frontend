import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../User/userSlice';
import { addJobAsync, selectJobDetail, updateJobAsync } from '../../Job/jobSlice';

const JobForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const jobDetail = useSelector(selectJobDetail)

  const [interestArr1, setinterestArr1] = useState(["full-Time", "Part-Time", "Internship", "Volunteering", "Remote"]);

  const [interestArr2, setinterestArr2] = useState([]);

  console.log(jobDetail);

  const handleUpdate = () => {

  }


  const handleForm = (data) => {

    console.log(data);

    if (jobDetail) {
      console.log(data);
      dispatch(updateJobAsync({ formData: data, id: jobDetail._id }))
    } else {
      // Adding one more important fileds in formdata
      data = { ...data, "postedBy": userId }
      dispatch(addJobAsync(data))
    }

    // reset()

  }

  const addInterest = (interest) => {
    setinterestArr2([...interestArr2, interest])
  }

  useEffect(() => {

    if (jobDetail) {
      setValue("category", jobDetail.category)
      setValue("city", jobDetail.city)
      setValue("country", jobDetail.country)
      setValue("description", jobDetail.description)
      setValue("fixedSalary", jobDetail.fixedSalary)
      setValue("location", jobDetail.location)
      setValue("salaryFrom", jobDetail.salaryFrom)
      setValue("salaryTo", jobDetail.salaryTo)
      setValue("title", jobDetail.title)

    }

  }, [])

  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-start gap-2 py-[70px]'>

      <h1 className='w-full h-[10vh] text-center text-4xl'>JOB FORM</h1>

      <form onSubmit={handleSubmit(handleForm)} className='w-[90%] lg:w-[60%] min-h-[80%] flex flex-col items-center justify-start gap-6' >

        {/* Title */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("title")} placeholder='Your Title' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.title && <p className='text-red'>{errors.title?.message}</p>}

        </div>

        {/* description */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("description")} placeholder='Your description' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.description && <p className='text-red'>{errors.description?.message}</p>}

        </div>

        {/* category */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("category")} placeholder='Your category' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.category && <p className='text-red'>{errors.category?.message}</p>}

        </div>

        {/* country */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("country")} placeholder='Your country' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.country && <p className='text-red'>{errors.country?.message}</p>}

        </div>

        {/* city */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("city")} placeholder='Your city' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.city && <p className='text-red'>{errors.city?.message}</p>}

        </div>

        {/* location */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("location")} placeholder='Your location' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.location && <p className='text-red'>{errors.location?.message}</p>}

        </div>

        {/* fixedSalary */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="number" {...register("fixedSalary")} placeholder='Your fixedSalary' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.fixedSalary && <p className='text-red'>{errors.fixedSalary?.message}</p>}

        </div>

        {/* salaryFrom */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="number" {...register("salaryFrom")} placeholder='Your salaryFrom' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.salaryFrom && <p className='text-red'>{errors.salaryFrom?.message}</p>}

        </div>

        {/* salaryTo */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="number" {...register("salaryTo")} placeholder='Your salaryTo' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.salaryTo && <p className='text-red'>{errors.salaryTo?.message}</p>}

        </div>

        {/* companyName */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("companyName")} placeholder='Your companyName' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.companyName && <p className='text-red'>{errors.companyName?.message}</p>}

        </div>

        {/* type */}
        <div className='w-full flex flex-col items-start justify-start'>

          <div className='w-full flex flex-wrap gap-2 text-[14px] p-2' style={{ borderBottom: '2px solid black' }}>
            {interestArr2?.length > 0 ? interestArr2.map((e, i) => (

              <input key={e} value={e} {...register(`type.${i}`)} className='w-fit bg-yellow-500 rounded-lg p-1'></input>

            )) : <span className='text-gray-400'>Choose Interest</span>}
          </div>

          <div className='flex flex-wrap gap-2 text-[14px] p-2'>
            {interestArr1.map((e) => (
              <p onClick={() => addInterest(e)} key={e} className='w-fit bg-yellow-500 rounded-lg p-1'>{e}</p>
            ))}
          </div>

        </div>

        {/* experience */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="number" {...register("experience")} placeholder='Your experience' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.experience && <p className='text-red'>{errors.fixedSalary?.message}</p>}

        </div>

        {!jobDetail ? <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Submit</button> : <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Update</button>}

      </form>

    </div>
  )
}

export default JobForm
