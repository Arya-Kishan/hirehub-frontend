import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages, selectOnlineUsers, selectSelectedUser, selectUnseenMessages, setMessages, setUnseenMessages } from '../../chatSlice';
import { selectUserId } from '../../../User/userSlice';
import { globalSocket } from '../../../../App';
import axios from 'axios';
import send1 from '../../../../assets/send1.svg'
import send2 from '../../../../assets/send2.svg'

const SendMessage = () => {

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const loggedInUserId = useSelector(selectUserId)
  const selectedUser = useSelector(selectSelectedUser)
  const messages = useSelector(selectMessages)
  const unseenMessages = useSelector(selectUnseenMessages)
  const onlineUsers = useSelector(selectOnlineUsers)

  const handleSendMeesage = async () => {

    if (inputRef.current.value == "") {
      return;
    }

    let res = await axios.post(`chat/addMessage`, {
      senderId: loggedInUserId,
      receiverId: selectedUser._id,
      message: inputRef.current.value
    })

    console.log(res.data.data);

    dispatch(setMessages([...messages.data, res?.data?.data]))

    // IF USER IS OFFLINE SAVING THE MESSAGE IN BACKEND FOR UNSEEN MESSAGE NOTIFICATION AND IF ONLINE THEN NOT SAVING IN BACKEND
    if (onlineUsers?.includes(selectedUser._id)) {
      console.log("USER IS ONLINE NOT SAVING THE MESSAGE IN BACKEND");
      globalSocket?.emit('sendMessage', { data: res.data.data });
    } else {
      console.log("USER IS OFFLINE SAVING THE MESSAGE IN BACKEND FOR UNSEEN MESSAGE NOTIFICATION");
      let { data } = axios.post(`chat/unseenMessage?type=add`, {
        senderId: loggedInUserId,
        receiverId: selectedUser._id,
        message: inputRef.current.value
      })

    }


    inputRef.current.value = "";

  }

  const handleEnter = (e) => {
    if (e.key == 'Enter') {
      handleSendMeesage();
    }
  }

  useEffect(() => {

    globalSocket?.on("receiveMessage", (message) => {

      console.log("receive message", message);
      console.log(selectedUser);


      if (selectedUser?._id == message?.senderId) {
        console.log("ADDING NEW MESSAGE");
        dispatch(setMessages([...messages.data, message]))
      } else {
        console.log("ADDING NEW MESSAGE TO UNSEEN");
        console.log(unseenMessages);
        console.log(message);
        dispatch(setUnseenMessages([...unseenMessages, message]))
      }


    })


    return () => {
      globalSocket.off('receiveMessage')
    }

  }, [messages.data, unseenMessages])


  return (
    <>
      {selectedUser && <div className='w-full flex p-2 gap-2'>
        <input onKeyUp={handleEnter} ref={inputRef} className='w-full bg-white rounded-lg text-xl' type="text" placeholder='Message...' />

        <img loading='lazy' className='w-[40px] h-[40px] bg-teal-800 rounded-full p-1' onClick={handleSendMeesage}  src={send1} alt="" srcSet="" />

      </div>}
    </>
  )
}

export default SendMessage
