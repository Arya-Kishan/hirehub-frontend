import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Pages/User/userSlice'
import jobReducer from '../Pages/Job/jobSlice'
import formReducer from '../Pages/Forms/formsSlice'
import communityReducer from '../Pages/Community/communitySlice'
import searchReducer from '../Pages/Search/searchSlice'
import blogReducer from '../Pages/Blogs/blogsSlice'
import chatReducer from '../Pages/Chat/chatSlice'
import applicationReducer from '../Pages/Application/applicationSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer,
        form: formReducer,
        blog: blogReducer,
        search: searchReducer,
        community: communityReducer,
        application: applicationReducer,
        chat: chatReducer,
    },
})