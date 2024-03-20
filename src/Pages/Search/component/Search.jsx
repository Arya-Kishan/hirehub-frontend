import React, { useEffect, useRef, useState } from 'react'
import search from "../../../assets/search.svg"
import { useDispatch, useSelector } from "react-redux"
import { searchJobAsync, searchUserAsync, selectSearchResult } from '../searchSlice'
import debounce from "lodash.debounce"

const Search = ({ type = "user", hide }) => {

    const inputRef = useRef(null)

    const searchResult = useSelector(selectSearchResult)
    const dispatch = useDispatch()

    const handleDebounce = debounce(() => {

        if (inputRef.current.value.length > 0) {
            if (type == "job") {
                dispatch(searchJobAsync({ query: `search=${inputRef.current.value}` }))
            } else if (type == "user") {
                dispatch(searchUserAsync({ query: `search=${inputRef.current.value}` }))
            }
        }

    }, 1000)

    useEffect(() => {

    }, [])

    console.log(searchResult);

    return (
        <div onClick={() => hide()} className='w-full h-[100vh] bg-gradient-to-r from-teal-500 flex justify-center items-center fixed top-0 left-0'>

            <div onClick={e => e.stopPropagation()} className='w-[70%] h-[70%] flex flex-col justify-start items-center gap-2 p-1'>

                <div className='w-full flex items-center justify-start bg-white'>
                    <input onChange={handleDebounce} ref={inputRef} className='w-[90%]' type="text" />
                    <img className='w-[30px]' src={search} alt="seae" srcSet="" />
                </div>

                <div className='w-full h-full overflow-y-scroll bg-white p-2'>
                    {searchResult?.map((e) => (
                        <p key={e._id} className='w-full p-1 border-b-2 border-solid border-whit'>{e?.title || e?.name}</p>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Search
