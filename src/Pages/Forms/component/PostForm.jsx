import React, { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../User/userSlice';
import { addPostAsync, selectAddingPostLoader, setAddingPostLoader } from '../../Community/communitySlice';
import { toast } from 'react-toastify';
import loader from '../../../assets/loader.svg'
import { useNavigate } from 'react-router-dom';

const PostForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const addingPostLoader = useSelector(selectAddingPostLoader)
  const [image, setImage] = useState(null);
  const imageRef = useRef(null)
  const navigate = useNavigate()

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

    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);

    if (Math.round(e.target?.files[0].size / 1024) > 100) {
      toast("PLEASE UPLOAD IMAGE OF LESSER THAN 100KB")
      return 0;
    }

    img.onload = () => {
      if ((img.width / img.height).toFixed(1) < 1.3) {
        toast("PLEASE UPLOAD IMAGE OF WIDER RESOLUTION")
      } else {
        setImage(URL.createObjectURL(e.target.files[0]))
      }

    };

  }

  useEffect(() => {
    if (addingPostLoader.result == "success") {
      navigate("/community")

      setTimeout(() => {
        dispatch(setAddingPostLoader({ result: null, loader: "idle" }))
      }, 500);
    }
  }, [addingPostLoader])

  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-start gap-2 pt-70px p-10'>

      <h1 className='w-full h-[10vh] text-center'>POST FORM</h1>

      <div className='w-full h-[40vh] bg-gray-300 flex items-center justify-center'>
        {image && <img ref={imageRef} className='object-contain h-[40vh]' src={image} alt="" />}
      </div>

      <form onSubmit={handleSubmit(handleForm)} className='w-[60%] min-h-[50vh] flex flex-col justify-start items-center gap-10' >

        {/* Pic - file */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="file" {...register("pic")} placeholder='Your pic' className='w-full' style={{ borderBottom: '2px solid black' }} onChange={(e) => handleImage(e)} />

          {errors?.pic && <p className='text-red'>{errors.pic?.message}</p>}

        </div>

        {/* hashtags */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("hashtags", {
            required: {
              value: true,
              message: 'Please Write Hashtags'
            }
          })} placeholder='Your hashtags' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.hashtags && <p className='text-red-500'>{errors.hashtags?.message}</p>}

        </div>

        {/* description */}
        <div className='w-full flex flex-col items-start justify-start'>

          <input type="text" {...register("description", {
            required: {
              value: true,
              message: 'Please Write Description'
            },
            minLength: {
              value: 10,
              message: 'Description should be greater than 10 characters'
            }
          })} placeholder='Your description' className='w-full' style={{ borderBottom: '2px solid black' }} />

          {errors?.description && <p className='text-red-500'>{errors.description?.message}</p>}

        </div>

        {addingPostLoader.loader == "loading" ? <div className='w-full bg-teal-500 px-6 py-2'><img className='w-[30px]' src={loader} alt="" srcSet="" /></div> : <button type='submit' className='w-full bg-teal-500 px-6 py-2 cursor-pointer hover:bg-teal-600'>Post</button>}

      </form>

    </div>
  )
}

export default memo(PostForm)
