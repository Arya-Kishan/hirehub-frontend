import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPost } from '../../Helper/AxiosCall';

const initialState = {
  status: 'idle',
  loginUser: {
    "_id": "65f9b6bf2f8c7fe881118a90",
    "name": "Test User",
    "email": "test@gmail.com",
    "phone": 1234567890,
    "password": "t1",
    "role": "applicant",
    "friends": [],
    "createdAt": "2024-03-19T16:01:03.982Z",
    "__v": 0
  },
  userId: "65f9b6bf2f8c7fe881118a90",
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
        state.loginUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loginUser = action.payload;
        state.userId = action.payload._id;
      })
  },
});

export const { logoutUser } = userSlice.actions;

export const selectStatus = (state) => state.user.status;
export const selectLoginUser = (state) => state.user.loginUser;
export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;
