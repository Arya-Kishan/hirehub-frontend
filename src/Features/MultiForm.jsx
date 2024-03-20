import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addApplicationAsync } from '../Pages/Application/applicationSlice';
import { addJobAsync } from '../Pages/Job/jobSlice';

const MultiForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { type } = useParams();
    const [inputArr, setInputArr] = useState(null)
    const dispatch = useDispatch();

    const handleForm = (data) => {

        let formData = new FormData();

        Object.keys(data).forEach((e) => {
            if (typeof (data[e]) == 'object') {
                formData.append(e, data[e][0])
            } else {
                formData.append(e, data[e])
            }
        })

        Object.keys(data).forEach((e) => {
            console.log(formData.get(e));
        })

        if (type == "application") {
            // Adding two more important fileds in formdata
            formData.append('applicantId', "65f654f85f6f754935f5b7f2")
            formData.append('employerId', "65f654f85f6f754935f5b7f2")
            dispatch(addApplicationAsync(formData))
        }

        if (type == "employer") {
            // Adding one more important fileds in formdata
            formData.append('postedBy', "65f654f85f6f754935f5b7f2")
            dispatch(addJobAsync(formData))
        }

    }

    useEffect(() => {

        if (type == "application") {
            setInputArr([{ type: "text", name: "name" }, { type: "text", name: "email" }, { type: "number", name: "phone" }, { type: "text", name: "address" }, { type: "text", name: "coverLetter" }, { type: "file", name: "resume" }])
        }

        if (type == "employer") {
            setInputArr([{ type: "text", name: "title" }, { type: "text", name: "description" }, { type: "text", name: "category" }, { type: "text", name: "country" }, { type: "text", name: "city" }, { type: "text", name: "location" }, { type: "number", name: "fixedSalary" }, { type: "number", name: "salaryFrom" }, { type: "number", name: "salaryTo" }])
        }

    }, [])


    return (
        <div className='w-full pt-[70px] flex flex-col items-center justify-start'>

            <h1 className='w-full text-center uppercase text-3xl'>{type} form</h1>

            <form onSubmit={handleSubmit(handleForm)} className='w-[80%] lg:w-[50%] flex flex-col items-center justify-evenly gap-10 pt-[80px]'>
                {inputArr?.map((e) => (
                    <div key={e.name} className='w-full'>
                        <input {...register(e.name, {
                            required: {
                                value: true,
                                message: `${e} Must Be Given`
                            }
                        })}
                            type={`${e.type}`}
                            placeholder={`your ${e.name}...`}
                            className='w-full outline-none border-none'
                            style={{ borderBottom: '2px solid black' }}
                        />
                        {errors[e.name] && <p className='text-[16px] md:text-2xl text-red-400 capitalize'>{errors[e.name]?.message}</p>}

                    </div>
                ))}

                <button type='submit' className='w-full bg-teal-500 px-6 py-2'>Submit</button>
            </form>

        </div>
    )
}

export default MultiForm
