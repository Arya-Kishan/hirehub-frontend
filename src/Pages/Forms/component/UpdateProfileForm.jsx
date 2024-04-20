import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, selectUserId, updateUserAsync } from '../../User/userSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

const UpdateProfileForm = () => {

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loggedInUserId = useSelector(selectUserId);
    const loggedInUser = useSelector(selectLoggedInUser);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const [interestArr1, setinterestArr1] = useState(["Frontend", "Backend", "Gaming", "Food", "Travel", "Music", "Sports", "Web"]);
    const [interestArr2, setinterestArr2] = useState([]);
    const imageRef = useRef(null)

    const handleForm = (data) => {

        console.log(data);
        console.log(data.bannerImg[0]);

        let formData = new FormData();

        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("role", data.role)
        formData.append("interest", data.interest)
        formData.append("bio", data.bio)
        formData.append("location", data.location)
        formData.append("bannerImg", data.bannerImg[0])
        formData.append("profilePic", data.profilePic[0])
        formData.append("socials", data.socials)

        Object.keys(data).forEach((e) => {
            console.log(e, " : ", formData.get(e));
        })

        dispatch(updateUserAsync({ formData: formData, userId: loggedInUserId }))

        navigate(`/profile/${loggedInUserId}`)

    }

    const handleImage = (e) => {

        let whichImg = (e.target.getAttribute("data-img"))

        const img = new Image();

        img.src = URL.createObjectURL(e.target.files[0]);

        if (Math.round(e.target?.files[0].size / 1024) > 100) {
            toast("PLEASE UPLOAD IMAGE OF LESSER THAN 100KB")
            return 0;
        }

        img.onload = () => {
            if ((img.width / img.height).toFixed(1) < 1) {
                toast("PLEASE UPLOAD IMAGE OF WIDER RESOLUTION")
            } else {

                if (whichImg == "bannerImg") {
                    setImage1(URL.createObjectURL(e.target.files[0]))
                } else {
                    setImage2(URL.createObjectURL(e.target.files[0]))
                }

            }

        };

    }

    const handleRemove = (e) => {
        console.log(e);

        // interestArr2.splice(1,1)

        let newArr = interestArr2.filter((elem) => elem !== e)
        console.log(newArr);

        // setinterestArr2(newArr)
        setinterestArr2((prev)=>[...newArr])

    }

    const addInterest = (interest) => {
        setinterestArr2([...interestArr2, interest])
    }

    useEffect(() => {

        if (loggedInUser) {
            setValue("name", loggedInUser.name)
            setValue("email", loggedInUser.email)
            setValue("phone", loggedInUser.phone)
            setValue("role", loggedInUser.role)
            setValue("bio", loggedInUser.bio)
            setValue("location", loggedInUser.location)

            setImage1(loggedInUser.bannerImg)
            setImage2(loggedInUser.profilePic)

            setinterestArr2(loggedInUser.interest)
        }

    }, [])

    console.log(interestArr2);



    return (
        <div className='w-full min-h-[100vh] px-2 py-[70px] mt-[60px] flex justify-center bg-gradient-to-r from-teal-500 to-teal-800 text-white'>

            <form onSubmit={handleSubmit(handleForm)} className='w-[80%] min-h-[50vh] flex flex-col justify-start items-center gap-10' >

                {/* name */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input type="text" {...register("name")} placeholder='Your name' className='w-full' style={{ borderBottom: '2px solid black' }} />

                </div>

                {/* email */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input type="text" {...register("email")} placeholder='Your email' className='w-full' style={{ borderBottom: '2px solid black' }} />

                </div>

                {/* phone */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input type="number" {...register("phone")} placeholder='Your phone' className='w-full' style={{ borderBottom: '2px solid black' }} />

                </div>

                {/* role */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <select {...register("role")} className='w-[90%] rounded-lg outline-none border-none'>
                        <option value="applicant">Applicant</option>
                        <option value="employer">Employer</option>
                    </select>

                </div>

                {/* interest */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <div className='w-full flex flex-wrap gap-2 text-[14px] p-2' style={{ borderBottom: '2px solid black' }}>
                        {interestArr2?.length > 0 ? interestArr2?.map((e, i) => (

                            <input onClick={() => handleRemove(e)} key={e} value={e} {...register(`interest.${i}`)} className='w-fit bg-yellow-500 rounded-lg p-1'></input>

                        )) : <span className='text-gray-400'>Choose Interest</span>}
                    </div>

                    <div className='flex flex-wrap gap-2 text-[14px] p-2'>
                        {interestArr1.map((e) => (
                            <p onClick={() => addInterest(e)} key={e} className='w-fit bg-yellow-500 rounded-lg p-1'>{e}</p>
                        ))}
                    </div>

                </div>

                {/* bio */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input type="text" {...register("bio")} placeholder='Your bio' className='w-full' style={{ borderBottom: '2px solid black' }} />

                </div>

                {/* location */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input type="text" {...register("location")} placeholder='Your location' className='w-full' style={{ borderBottom: '2px solid black' }} />

                </div>

                <img src={image1} alt="" srcSet="" />

                {/* bannerImg */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input
                        type="file"
                        {...register("bannerImg")}
                        onChange={handleImage}
                        data-img="bannerImg"
                        className='w-full'
                        style={{ borderBottom: '2px solid black' }} />

                </div>

                <img src={image2} alt="" srcSet="" />


                {/* profilePic */}
                <div className='w-full flex flex-col items-start justify-start'>

                    <input
                        type="file"
                        {...register("profilePic")}
                        onChange={handleImage}
                        data-img="profilePic"
                        className='w-full'
                        style={{ borderBottom: '2px solid black' }} />

                </div>

                {/* socials */}
                <div className='w-full flex flex-col items-start justify-start'>

                    {
                        ["instagram", "linkedIn", "twitter"].map((e, i) => (

                            <div key={e} className='flex flex-col'>
                                <p className='capitalize'>{e}</p>
                                <input type="text" {...register(`socials.${i}`)} placeholder='Your link' className='w-full' style={{ borderBottom: '2px solid black' }} />
                            </div>

                        ))

                    }
                </div>

                <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Update</button>

            </form>

        </div>
    )
}

export default memo(UpdateProfileForm);
