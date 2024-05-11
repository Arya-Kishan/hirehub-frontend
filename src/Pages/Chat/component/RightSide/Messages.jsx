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
            console.log("FETCHING SELECTED USER MESSAGES : ", selectedUser);
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
    }, [messages.data])

    return (
        <>
            {selectedUser
                ?
                <div className='flex h-full flex-col gap-2 p-4 overflow-auto'>
                    {messages.loader ? <div className='w-full h-full flex justify-center items-center'>
                        <p className='capitalize text-[12px] text-gray-800 opacity-[0.5]'>Getting Messages...</p>
                    </div> : messages.data?.length > 0
                        ?
                        messages.data?.map((e) => (
                            <div key={e._id} className={`w-full flex flex-col ${e.senderId == loggedInUserId ? "items-end" : "items-start"}`}>
                                <div ref={lastDivRef} className={`w-[45%] bg-teal-400 p-2 rounded-xl ${e.senderId == loggedInUserId ? "rounded-br-none" : "rounded-bl-none"}`}>
                                    <p>{e.message}</p>
                                    <p className='text-end text-[10px]'>{dayjs(e?.createdAt).format("hh mm a")}</p>
                                </div>
                            </div>
                        ))
                        :
                        <div className='w-full h-full flex justify-center items-center'>
                            <p>NO MESSAGES</p>
                        </div>}
                </div>
                :
                <div className='w-full h-full flex justify-center items-center'>CHOOSE CHAT</div>}
        </>
    )
}

export default Messages
