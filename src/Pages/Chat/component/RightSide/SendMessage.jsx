import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages, selectOnlineUsers, selectSelectedUser, selectUnseenMessages, setMessages, setUnseenMessages } from '../../chatSlice';
import { selectUserId } from '../../../User/userSlice';
import { globalSocket } from '../../../../App';
import axios from 'axios';

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

    dispatch(setMessages([...messages, res?.data?.data]))

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
        dispatch(setMessages([...messages, message]))
      } else {
        console.log("ADDING NEW MESSAGE TO UNSEEN");
        dispatch(setUnseenMessages([...unseenMessages, message]))
      }
      // dispatch(pushMessage(message))

    })

  }, [messages])

  return (
    <>
      {selectedUser && <div className='w-full flex p-2 pb-[100px] md:pb-0'>
        <input onKeyUp={handleEnter} ref={inputRef} className='w-[90%] bg-white rounded-lg' type="text" />

        <p onClick={handleSendMeesage} >Send</p>

      </div>}
    </>
  )
}

export default SendMessage
