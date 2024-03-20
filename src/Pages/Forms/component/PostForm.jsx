import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { selectEmployerId } from '../formsSlice';
import { selectUserId } from '../../User/userSlice';
import { addPostAsync } from '../../Community/communitySlice';

const PostForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const employerId = useSelector(selectEmployerId);
  const userId = useSelector(selectUserId);
  const [image, setImage] = useState(null);

  const handleForm = (data) => {

    console.log(data);

    let formData = new FormData();

    formData.append('pic', data.pic[0])
    formData.append('userId', userId)
    formData.append('hashtags', data.hashtags)
    formData.append('description', data.description)

    Object.keys(data).forEach((e) => {
      console.log(formData.get(e));
    })

    dispatch(addPostAsync(formData))


  }

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {

  }, [])

  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-start gap-2 pt-70px p-10'>

      <h1 className='w-full h-[10vh] text-center'>POST FORM</h1>

      <div className='w-full h-[40vh] bg-gray-300 flex items-center justify-center'>
        {image && <img className='object-contain h-[40vh]' src={image} alt="" />}
      </div>

      <form onSubmit={handleSubmit(handleForm)} className='w-[60%] min-h-[50vh] flex flex-col justify-start items-center gap-10' >

        {/* Pic - file */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="file" {...register("pic")} placeholder='Your pic' className='w-full' style={{ borderBottom: '2px solid black' }} onChange={(e) => handleImage(e)} />

          {errors?.pic && <p className='text-red'>{errors.pic?.message}</p>}

        </div>

        {/* hashtags */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("hashtags")} placeholder='Your hashtags' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.hashtags && <p className='text-red'>{errors.hashtags?.message}</p>}

        </div>

        {/* description */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("description")} placeholder='Your description' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.description && <p className='text-red'>{errors.description?.message}</p>}

        </div>

        <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Post</button>

      </form>

    </div>
  )
}

export default memo(PostForm)
