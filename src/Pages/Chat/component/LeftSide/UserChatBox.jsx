import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, selectUserId } from '../../../User/userSlice'
import { selectFriends, selectOnlineUsers, selectSelectedUser, selectUnseenMessages, setSelectedUser, setUnseenMessages } from '../../chatSlice'
import dayjs from "dayjs"
import axios from 'axios'

const UserChatBox = () => {

    const dispatch = useDispatch()
    const friends = useSelector(selectFriends)
    const loggedInUser = useSelector(selectLoggedInUser)
    const loggedInUserId = useSelector(selectUserId)
    const selectedUser = useSelector(selectSelectedUser)
    const onlineUsers = useSelector(selectOnlineUsers)
    const unseenMessages = useSelector(selectUnseenMessages)


    const handleClickUserBox = (user) => {
        dispatch(setSelectedUser(user))

        let notificationToDeleteFromBackend_Arr = unseenMessages?.filter((elem) => (elem.senderId == user._id))
        dispatch(setUnseenMessages(unseenMessages?.filter((elem) => (elem.senderId != user._id))))

        async function deleteUnseenMessages() {

            let res = await axios.post(`chat/unseenMessage?type=delete`, notificationToDeleteFromBackend_Arr)

            console.log(res);

        }

        deleteUnseenMessages()

    }

    async function getUnseenMessages() {

        // FETCHING UNSEEN MESSAGES
        let res = await axios.post(`chat/unseenMessage?type=get`, {
            receiverId: loggedInUserId,
        })

        console.log(res.data?.data);

        if (res.status == 200) {
            dispatch(setUnseenMessages([...unseenMessages, res.data?.data]))
        }

    }


    function getUnseenMessagesCount(e) {
        return unseenMessages.filter((elem) => (elem.senderId == e._id)).length
    }

    useEffect(() => {
        getUnseenMessages()
    }, [])

    // console.log(selectedUser);

    return (
        <>
            {friends?.map((e) => (
                <div key={e._id} onClick={() => handleClickUserBox(e)} className={`flex items-center justify-start gap-2 ${selectedUser?._id == e._id ? "bg-teal-700" : "bg-yellow-900"} p-2 cursor-pointer hover:bg-teal-700`}>

                    <div className='w-[50px] h-[50px] flex relative'>
                        <img className='w-[50px] h-[50px] rounded-full bg-teal-500' src={e.profilePic} alt="" srcSet="" />
                        {onlineUsers.includes(e._id) && <p className='w-[10px] h-[10px] rounded-full bg-green-600 absolute top-0 right-0'></p>}
                    </div>

                    <div className='w-[70%] flex flex-col gap-1'>
                        <p className='font-bold'>{e.name}</p>
                        <p className='text-[10px]'>Ther  was a time of peoples</p>
                    </div>

                    <div className='w-[20%] flex flex-col items-end justify-start gap-1'>
                        <p className='text-[12px]'>{dayjs(e.active).format("hh mm a")}</p>
                        {getUnseenMessagesCount(e) == 0 ? "" : <p className='w-[20px] h-[20px] text-[10px] rounded-full bg-teal-500 flex justify-center items-center'>{unseenMessages.filter((elem) => (elem.senderId == e._id)).length}</p>}
                    </div>

                </div>
            ))}
        </>
    )
}

export default UserChatBox
