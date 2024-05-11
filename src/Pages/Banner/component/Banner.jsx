import React, { useRef, useState } from 'react'
import debounce from "lodash.debounce"
import bannerImg from "../../../assets/bannerImg.svg"
import search from "../../../assets/search.svg"
import blob4 from "../../../assets/blob4.svg"
import Search from '../../Search/component/Search'

const Banner = () => {

    const inputRef = useRef(null)
    const [showSearch, setShowSearch] = useState(null)

    const handleSearchJob = () => {
        console.log(inputRef.current.value);
    }

    const handleDebounceJobSearch = debounce(() => {
        console.log("hii searching");
    }, 1000)

    return (
        <div className='flex flex-wrap overflow-hidden relative'>

            <div className='w-[100vw] h-[50vh] lg:w-[50%] lg:h-[100vh] flex flex-col justify-center items-center '>

                <div className='w-[60%] flex flex-col gap-10 z-20'>

                    <h1 className='text-2xl md:text-3xl lg:text-5xl text-start font-bold'>Find your <span className='text-teal-500'>dream job</span> here easily and quickly</h1>

                    <div className='w-[100%] lg:w-[60%] flex bg-white rounded-lg border-4 border-solid border-teal-500'>

                        <input ref={inputRef} className='w-[85%] rounded-lg' type="text" placeholder='Search...' onFocus={() => setShowSearch(true)} onChange={handleDebounceJobSearch} />

                        <img loading='lazy' onClick={handleSearchJob} className='w-[15%] bg-teal-500 p-1' src={search} alt="" srcSet="" />

                    </div>

                </div>

            </div>

            <div className='relative w-[100vw] h-[50vh] lg:w-[50%] lg:h-[100vh] flex justify-center items-center z-20'>

                <div className='w-[40vh] h-[40vh] lg:w-[700px] lg:h-[700px] bg-white lg:bg-teal-500 rounded-full flex justify-center items-center z-1 lg:absolute -bottom-[140px] -right-[140px]'>

                    <div className='w-[90%] h-[90%] bg-white rounded-full flex justify-center items-center'>
                        <img loading='lazy' className='w-[90%] lg:w-[70%]' src={bannerImg} alt="bannerImg" srcSet="" />
                    </div>

                </div>


            </div>

            {showSearch && <Search type='job' hide={setShowSearch} />}

            <img loading='lazy' className='absolute -top-[10%] -left-[100px] w-[500px] h-[500px] z-1 rotate-90' src={blob4} alt="" srcSet="" />

        </div>
    )
}

export default Banner
