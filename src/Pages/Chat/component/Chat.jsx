import React, { useEffect } from 'react'
import ChatHeading from './RightSide/ChatHeading'
import Messages from './RightSide/Messages'
import SendMessage from './RightSide/SendMessage'
import UserChatBox from './LeftSide/UserChatBox'
import { selectRightSideSlide, setRightSideSlide } from '../chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../User/userSlice'

const Chat = () => {

    const dispatch = useDispatch()
    const loggedInUserId = useSelector(selectUserId)
    const rightSideSlide = useSelector(selectRightSideSlide)


    function listenPopstate() {
        console.log("arya");
        dispatch(setRightSideSlide('left-full'))
    }

    useEffect(() => {

        if (window.innerWidth <= 768) {
            window.addEventListener("popstate", listenPopstate)

            return () => window.removeEventListener("popstate", listenPopstate)
        }


    }, [])

    return (
        <div className='w-full h-dvh p-1 pt-[60px] pb-[48px] md:pb-[2px] flex overflow-hidden relative gap-1'>

            {/* LEFT SIDE */}
            <div className='absolute top-0 left-0 pt-[60px] pb-[48px] md:pt-0 md:pb-0 w-full md:static md:w-[30%] h-full bg-teal-950'>

                <UserChatBox />

            </div>

            {/* RIGHT SIDE */}
            <div className={`absolute top-0 ${rightSideSlide} pt-[60px] pb-[48px] md:pt-0 md:pb-0 w-full md:static md:w-[70%] flex flex-col h-full bg-teal transition-all duration-300 bg-teal-950`}>

                <ChatHeading />

                {/* MESSAGES */}
                <Messages />

                <SendMessage />

            </div>

        </div>
    )
}

export default Chat
