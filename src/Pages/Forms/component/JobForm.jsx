import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../User/userSlice';
import { addJobAsync, selectJobDetail, selectJobLoader, updateJobAsync } from '../../Job/jobSlice';
import Loader from '../../../Features/Loader';
import loader from "../../../assets/loader.svg"

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
  const jobLoader = useSelector(selectJobLoader)

  const [interestArr1, setinterestArr1] = useState(["full-Time", "Part-Time", "Internship", "Volunteering", "Remote"]);

  const [interestArr2, setinterestArr2] = useState([]);

  console.log(jobDetail);

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

  const handleRemoveType = (e) => {
    console.log(e);
    console.log(interestArr2);
    let index = interestArr2.findIndex((el) => el == e)
    console.log(index);
    interestArr2.splice(index, 1)
    console.log(interestArr2);
    setinterestArr2(interestArr2)
  }

  useEffect(() => {

    if (jobDetail) {
      setValue("title", jobDetail.title)
      setValue("description", jobDetail.description)
      setValue("country", jobDetail.country)
      setValue("city", jobDetail.city)
      setValue("location", jobDetail.location)
      setValue("fixedSalary", jobDetail.fixedSalary)
      setValue("companyName", jobDetail.companyName)
      setValue("experience", jobDetail.experience)
    }

    if (jobDetail?.type) {
      setinterestArr2(jobDetail?.type)
    }

  }, [])

  console.log(interestArr2);

  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-start gap-2 py-[70px]'>

      <h1 className='w-full h-[10vh] text-center text-4xl'>JOB FORM</h1>

      <form onSubmit={handleSubmit(handleForm)} className='w-[90%] lg:w-[60%] min-h-[80%] flex flex-col items-center justify-start gap-6' >

        {/* Title */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("title")} placeholder='Title' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.title && <p className='text-red'>{errors.title?.message}</p>}

        </div>

        {/* description */}
        <div className='w-full flex flex-col items-start justify-start'>

          <textarea type="text" {...register("description")} placeholder='description' className='w-full h-[200px]' style={{ borderBottom: '2px solid black' }} />

          {errors?.description && <p className='text-red'>{errors.description?.message}</p>}

        </div>

        {/* location */}
        <div className='w-full flex flex-col items-start justify-start'>

          <textarea type="text" {...register("location")} placeholder='location' className='w-full h-[100px]' style={{ borderBottom: '2px solid black' }} />

          {errors?.location && <p className='text-red'>{errors.location?.message}</p>}

        </div>

        <div className='w-full flex justify-between gap-4'>

          {/* country */}
          <div className='w-full flex flex-col items-start justify-start'>

            <input type="text" {...register("country")} placeholder='country' className='w-full' style={{ borderBottom: '2px solid black' }} />

            {errors?.country && <p className='text-red'>{errors.country?.message}</p>}

          </div>

          {/* city */}
          <div className='w-full flex flex-col items-start justify-start'>

            <input type="text" {...register("city")} placeholder='city' className='w-full' style={{ borderBottom: '2px solid black' }} />

            {errors?.city && <p className='text-red'>{errors.city?.message}</p>}

          </div>

        </div>

        <div className='w-full flex justify-between gap-4'>

          {/* experience */}
          <div className='w-full flex flex-col items-start justify-start'>

            <input type="number" {...register("experience", {
              required: {
                value: true,
                message: 'Fill the experience'
              },
              min: {
                value: 1,
                message: "BETWEEN 1 - 3"
              },
              max: {
                value: 3,
                message: "BETWEEN 1 - 3"
              }
            })} placeholder='experience' className='w-full' style={{ borderBottom: '2px solid black' }} />

            {errors?.experience && <p className='text-red'>{errors.fixedSalary?.message}</p>}

          </div>

          {/* fixedSalary */}
          <div className='w-full flex flex-col items-start justify-start'>

            <input type="number" {...register("fixedSalary")} placeholder='fixedSalary' className='w-full' style={{ borderBottom: '2px solid black' }} />

            {errors?.fixedSalary && <p className='text-red'>{errors.fixedSalary?.message}</p>}

          </div>

        </div>

        {/* companyName */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("companyName")} placeholder='companyName' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.companyName && <p className='text-red'>{errors.companyName?.message}</p>}

        </div>

        {/* type */}
        <div className='w-full flex flex-col items-start justify-start'>

          <div className='w-full flex flex-wrap gap-2 text-[14px] p-2' style={{ borderBottom: '2px solid black' }}>
            {interestArr2?.length > 0 ? interestArr2.map((e, i) => (

              <input onFocus={(e) => handleRemoveType(e.target.value)} key={e} value={e} {...register(`type.${i}`)} className='w-fit bg-yellow-500 rounded-lg p-1'></input>

            )) : <span className='text-gray-400'>Choose Type</span>}
          </div>

          <div className='flex flex-wrap gap-2 text-[14px] p-2'>
            {interestArr1.map((e) => (
              <p onClick={() => addInterest(e)} key={e} className='w-fit bg-yellow-500 rounded-lg p-1'>{e}</p>
            ))}
          </div>

        </div>


        {jobLoader == "idle" ? !jobDetail ? <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Create</button> : <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Update</button> : <img loading='lazy' className='w-[50px]' src={loader} alt="" srcset="" />}

      </form>

    </div>
  )
}

export default JobForm
