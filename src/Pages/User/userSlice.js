import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetById, axiosPost } from '../../Helper/AxiosCall';

const initialState = {
  status: 'idle',
  loggedInUser:null,
  userId: null,
  otherUserDetail:null,
};



export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (formData) => {
    const response = await axiosPost({ data: formData, endPoint: "user", errorMessage: "NOT REGISTERED", successMessage: "REGISTERED" });
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (formData) => {
    const response = await axiosPost({ data: formData, endPoint: "user/login", errorMessage: "INVALID CREDENTIALS", successMessage: "LOGGED IN" });
    return response.data;
  }
);


export const getOtherUserDetailAsync = createAsyncThunk(
  'auth/getUserDetail',
  async (userId) => {
    const response = await axiosGetById({endPoint: "user",query:"userId",id:userId });
    return response.data;
  }
);






export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.userId = action.payload._id;
      })
      .addCase(getOtherUserDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOtherUserDetailAsync.fulfilled, (state, action) => {
        state.otherUserDetail = action.payload;
      })
  },
});

export const { logoutUser } = userSlice.actions;

export const selectStatus = (state) => state.user.status;
export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectUserId = (state) => state.user.userId;
export const selectOtherUserDetail = (state) => state.user.otherUserDetail;

export default userSlice.reducer;
