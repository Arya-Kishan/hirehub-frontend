import React from 'react'
import { selectOnlineUsers, selectSelectedUser } from '../../chatSlice'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const ChatHeading = () => {

    const selectedUser = useSelector(selectSelectedUser)
    const onlineUsers = useSelector(selectOnlineUsers)

    function activeAgo() {

        if (onlineUsers.includes(selectedUser._id)) {
            return <span className='text-green-500'>Active Now</span>
        } else {
            return `${ dayjs().from(dayjs(selectedUser.active)).split(" ").slice(1).join(" ") } ago`
        }


    }

    return (


        <>
            {selectedUser ? <div className='w-full h-[70px] flex justify-between items-center gap-2 p-2 bg-teal-950'>

                <img className='w-[50px] h-[50px] rounded-full bg-teal-500' src={selectedUser.profilePic} alt="" srcSet="" />

                <div className='w-full flex flex-col gap-1'>
                    <p className='text-white text-2xl'>{selectedUser.name}</p>
                    <p className='text-white text-1xl'>{activeAgo(selectedUser)}</p>
                </div>

                <p className='w-[30px] h-[30px] rounded-full bg-teal-500 flex justify-center items-center'>i</p>

            </div> : <div className='w-full h-[70px] flex justify-between items-center p-2'>

                {/* <img className='w-[50px] h-[50px] rounded-full bg-teal-500' src="https://api.multiavatar.com/Starcrasher.png" alt="" srcSet="" />

                <p className='w-full text-white text-2xl'>User</p>

                <p className='w-[30px] h-[30px] rounded-full bg-teal-500 flex justify-center items-center'>i</p> */}

            </div>}
        </>
    )
}

export default ChatHeading
