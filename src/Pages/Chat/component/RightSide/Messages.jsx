import React, { useEffect, useRef } from 'react'
import { getMessagesAsync, selectMessages, selectSelectedUser } from '../../chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../../User/userSlice'
import dayjs from "dayjs"
import { globalSocket } from '../../../../App'


const Messages = () => {

    const selectedUser = useSelector(selectSelectedUser)
    const loggedInUserId = useSelector(selectUserId)
    const messages = useSelector(selectMessages)
    const dispatch = useDispatch()

    const lastDivRef = useRef(null)

    useEffect(() => {

        if (selectedUser) {
            dispatch(getMessagesAsync({
                data: {
                    senderId: loggedInUserId,
                    receiverId: selectedUser._id,
                }
            }))
        }

    }, [selectedUser])

    useEffect(() => {
        lastDivRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <>
            {selectedUser ? <div className='flex h-full flex-col gap-2 p-2 overflow-auto'>
                {messages.length > 0 ? messages?.map((e) => (
                    <div key={e._id} className={`w-full flex flex-col ${e.senderId == loggedInUserId ? "items-end" : "items-start"}`}>
                        <div ref={lastDivRef} className='w-[50%] bg-teal-400 p-2 rounded-lg'>
                            <p>{e.message}</p>
                            <p className='text-end'>{dayjs(e?.createdAt).format("hh mm a")}</p>
                        </div>
                    </div>
                )) : <div className='w-full h-full flex justify-center items-center'>
                    <p>NO MESSAGES</p>
                </div>}
            </div> : <div className='w-full bg-red-900 h-full flex justify-center items-center'>ARYA</div>}
        </>
    )
}

export default Messages
