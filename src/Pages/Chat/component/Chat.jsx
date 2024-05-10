import React, { useEffect } from 'react'
import ChatHeading from './RightSide/ChatHeading'
import Messages from './RightSide/Messages'
import SendMessage from './RightSide/SendMessage'
import UserChatBox from './LeftSide/UserChatBox'
import ChatOptions from './LeftSide/ChatOptions'
import { getUserFriendsAsync } from '../chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../User/userSlice'

const Chat = () => {

    const dispatch = useDispatch()
    const loggedInUserId = useSelector(selectUserId)

    useEffect(() => {
        dispatch(getUserFriendsAsync({ query: `userId=${loggedInUserId}` }))
    }, [])

    return (
        <div className='w-full h-[100vh] pt-[70px] flex'>

            {/* LEFT SIDE */}
            <div className='w-[30%] h-full bg-teal-400'>

                <ChatOptions />

                <UserChatBox />

            </div>

            {/* RIGHT SIDE */}
            <div className='w-[70%] flex flex-col h-full bg-teal-500'>

                <ChatHeading />

                {/* MESSAGES */}
                <Messages />

                <SendMessage />

            </div>

        </div>
    )
}

export default Chat
