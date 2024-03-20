import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'
import { selectLoginUser } from '../Pages/User/userSlice';

const Protected = ({ children }) => {

    const navigate = useNavigate();
    const user = useSelector(selectLoginUser)

    console.log(user);

    if (!user) {
        return <Navigate to={'/login'} />
    }


    return (children)
}

export default Protected
