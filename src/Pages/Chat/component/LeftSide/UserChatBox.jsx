import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, selectUserId } from '../../../User/userSlice'
import { getUserFriendsAsync, selectFriendLoader, selectFriends, selectOnlineUsers, selectSelectedUser, selectUnseenMessages, setMessages, setRightSideSlide, setSelectedUser, setUnseenMessages } from '../../chatSlice'
import dayjs from "dayjs"
import axios from 'axios'
import search from '../../../../assets/search.svg'
import debounce from 'lodash.debounce'

const UserChatBox = () => {

    const dispatch = useDispatch()
    const friends = useSelector(selectFriends)
    const friendLoader = useSelector(selectFriendLoader)
    const loggedInUserId = useSelector(selectUserId)
    const selectedUser = useSelector(selectSelectedUser)
    const onlineUsers = useSelector(selectOnlineUsers)
    const unseenMessages = useSelector(selectUnseenMessages)

    const [friendData, setFriendData] = useState([])

    const inputRef = useRef(null)


    const handleClickUserBox = (user) => {

        dispatch(setSelectedUser(user))
        dispatch(setMessages({ loader: false, data: [] }))

        let notificationToDeleteFromBackend_Arr = unseenMessages?.filter((elem) => (elem.senderId == user._id))
        dispatch(setUnseenMessages(unseenMessages?.filter((elem) => (elem.senderId != user._id))))

        async function deleteUnseenMessages() {

            let res = await axios.post(`chat/unseenMessage?type=delete`, notificationToDeleteFromBackend_Arr)

            console.log(res);

        }

        deleteUnseenMessages()

        // used to bring right side chat on left(screen) and push a state in histiry stack
        if (window.innerWidth <= 768) {
            dispatch(setRightSideSlide('left-0'))
            history.pushState({}, "slide")
        }

    }

    async function getUnseenMessages() {

        // FETCHING UNSEEN MESSAGES
        let res = await axios.post(`chat/unseenMessage?type=get`, {
            receiverId: loggedInUserId,
        })

        // console.log(res.data?.data);

        if (res.status == 200) {
            dispatch(setUnseenMessages(res.data?.data))
        }

    }


    function getUnseenMessagesCount(e) {
        return unseenMessages.filter((elem) => (elem.senderId == e._id)).length
    }

    useEffect(() => {
        dispatch(getUserFriendsAsync({ query: `userId=${loggedInUserId}` }))
        getUnseenMessages()
    }, [])

    useEffect(() => {
        setFriendData(friends)
    }, [friends])

    // FILTERING THE NAMES
    const handleSearchDebounce = debounce(() => {
        setFriendData(friends.filter((e) => (e.name.toLowerCase().startsWith(inputRef.current.value.toLowerCase()))))
    }, 500)

    // console.log(selectedUser);

    return (
        <>

            <div className='w-full h-[70px] flex justify-around items-center px-4 gap-2 text-white text-xl'>
                <div className='w-full flex gap-2 bg-white rounded-lg px-2'>
                    <input onChange={handleSearchDebounce} ref={inputRef} className='w-full bg-white border-none outline-none rounded-lg text-black p-1 text-xl' type="text" />
                    <img loading='lazy' className='w-[30px]' src={search} alt="" srcSet="" />
                </div>
            </div>

            {!friendLoader
                ?
                <>
                    {friendData?.map((e) => (
                        <div key={e._id} onClick={() => handleClickUserBox(e)} className={`flex items-center justify-start gap-2 ${selectedUser?._id == e._id ? "bg-teal-700" : "bg-transparent"} p-2 cursor-pointer hover:bg-teal-700 text-white`}>

                            <div className='w-[50px] h-[50px] flex relative'>
                                <img loading='lazy' className='w-[50px] h-[50px] rounded-full bg-teal-500' src={e.profilePic} alt="" srcSet="" />
                                {onlineUsers.includes(e._id) && <p className='w-[10px] h-[10px] rounded-full bg-green-600 absolute top-0 right-0'></p>}
                            </div>

                            <div className='w-[70%] flex flex-col gap-1'>
                                <p className='font-bold'>{e.name}</p>
                                <p className='text-[10px]'>Ther  was a time of peoples</p>
                            </div>

                            <div className='w-[20%] flex flex-col items-end justify-start gap-1'>
                                <p className='text-[9px]'>{dayjs(e.active).format("hh:mm a")}</p>
                                {getUnseenMessagesCount(e) == 0 ? "" : <p className='w-[20px] h-[20px] text-[10px] rounded-full bg-teal-500 flex justify-center items-center'>{unseenMessages.filter((elem) => (elem.senderId == e._id)).length}</p>}
                            </div>

                        </div>
                    ))}
                </>
                :
                <div className='flex justify-center items-center h-full text-white text-xl'>Loading...</div>}


        </>
    )
}

export default UserChatBox
