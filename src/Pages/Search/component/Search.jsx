import React, { useEffect, useRef } from 'react'
import search from "../../../assets/search.svg"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchJobAsync, searchUserAsync, selectJobSearchResult, selectSearchLoader, selectUserSearchResult, setJobSearchResult, setUserSearchResult } from '../searchSlice'
import debounce from "lodash.debounce"
import Loader from '../../../Features/Loader'

const Search = ({ type = "user", hide }) => {

    const inputRef = useRef(null)

    const userSearchResult = useSelector(selectUserSearchResult)
    const jobSearchResult = useSelector(selectJobSearchResult)
    const searchLoader = useSelector(selectSearchLoader)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        if (type == "job") {
            navigate(`/jobDetails/${id}`)
        } else if (type == "user") {
            navigate(`/profile/${id}`)
        }
    }

    const handleDebounce = debounce(() => {

        if (inputRef.current.value.length > 0) {
            if (type == "job") {
                setUserSearchResult()
                dispatch(searchJobAsync({ query: `search=${inputRef.current.value}` }))
            } else if (type == "user") {
                setJobSearchResult()
                dispatch(searchUserAsync({ query: `search=${inputRef.current.value}` }))
            }
        }

    }, 500)

    console.log(searchLoader);


    return (
        <div onClick={() => hide()} className='w-full h-[100vh] bg-gradient-to-r from-teal-500 flex justify-center items-center fixed top-0 left-0 z-20'>

            <div onClick={e => e.stopPropagation()} className='w-[70%] h-[70%] flex flex-col justify-start items-center gap-2 p-1'>

                <div className='w-full flex items-center justify-start bg-slate-200 rounded-xl p-1 border-2 border-teal-400 shadow-2xl shadow-black'>
                    <input onChange={handleDebounce} ref={inputRef} autoFocus className='w-[96%]' type="text" placeholder='Search...' />
                    <img loading='lazy' className='w-[30px] bg-teal-400 p-1 rounded-full' src={search} alt="seae" srcSet="" />
                </div>

                <div className='w-full h-full overflow-y-scroll bg-slate-200 p-2 rounded-xl border-2 border-teal-400 shadow-2xl shadow-black'>

                    {console.log(searchLoader.loader)}
                    {searchLoader.loader == "loading"
                        ?
                        <div className='w-full h-full flex items-center justify-center'>Loading...</div>
                        :
                        userSearchResult?.length > 0 || jobSearchResult?.length > 0
                            ?
                            <>

                                {type == "user" && userSearchResult?.map((e) => (
                                    <p onClick={() => handleNavigate(e?._id)} key={e._id} className='w-full p-1 border-b-2 border-solid border-white hover:bg-teal-500 cursor-pointer'>{e?.title || e?.name}</p>
                                ))}


                                {type == "job" && jobSearchResult?.map((e) => (
                                    <p onClick={() => handleNavigate(e?._id)} key={e._id} className='w-full p-1 border-b-2 border-solid border-white hover:bg-teal-500 cursor-pointer'>{e?.title || e?.name}</p>
                                ))}

                            </>
                            :
                            <div className='w-full h-full flex justify-center items-center'>NO RECORDS FOR '{inputRef.current?.value}'</div>}


                </div>

            </div>

        </div>
    )
}

export default Search
