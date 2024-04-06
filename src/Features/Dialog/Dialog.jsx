import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeletePostAsync, selectDialog, setDialog } from '../../Pages/Community/communitySlice'
import { selectLoggedInUser } from '../../Pages/User/userSlice'

const Dialog = () => {

    const [toggle, setToggle] = useState()

    const dispatch = useDispatch()
    const dialog = useSelector(selectDialog)
    const loggedInUser = useSelector(selectLoggedInUser)
    console.log(dialog);

    const hideDialog = () => {
        dispatch(setDialog({ show: false, type: "", id: 0 }))
    }


    const handleDelete = () => {

        if (dialog?.type == "post") {
            dispatch(handleDeletePostAsync(dialog.id))
        }

        if (dialog?.type == "user") {

            if (loggedInUser.upgrade.pro == true) {
                dispatch(deleteAccountAsync(dialog.id))
            } else {
                alert("Only Pro User alllowed to delete Account")
            }
        }

        dispatch(setDialog({ show: false, type: "", id: 0 }))
    }

    return (
        <div onClick={hideDialog} className={`${dialog?.show ? "flex" : "hidden"} w-full h-[100vh] justify-center items-center fixed top-0 left-0 bg-gradient-to-r from-black`}>

            <div onClick={e => e.stopPropagation()} className='w-[80%] md:w-[400px] h-[200px] text-2xl flex flex-col gap-5 justify-center items-center rounded-lg bg-teal-500'>

                <p>Are you sure to delete</p>

                <div className='flex gap-2'>
                    <button onClick={hideDialog} className='px-4 py-1 bg-white'>Cancel</button>
                    <button onClick={handleDelete} className='px-4 py-1 bg-white'>Delete</button>
                </div>


            </div>

        </div>
    )
}

export default memo(Dialog)
