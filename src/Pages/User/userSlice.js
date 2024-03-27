import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetById, axiosPost } from '../../Helper/AxiosCall';
import axios from 'axios';

const initialState = {
  status: 'idle',
  loggedInUser: null,
  userId: null,
  otherUserDetail: null,
  preCheckUser: false,
};


export const loginGuestUserAsync = createAsyncThunk(
  'auth/loginGuestUser',
  async () => {
    try {
      console.log("login as guest");
      const response = await axios("/user/guest");
      localStorage.setItem("x-jwt-routes", response.headers?.["x-jwt-routes"])
      console.log("asd");
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);


export const checkUserWithJwtAsync = createAsyncThunk(
  'auth/checkUserJwt',
  async (jwtToken, { rejectWithValue }) => {
    try {
      const response = await axiosGetById({ endPoint: "user/checkUserWithJwt", query: "checkUserWithJwt", id: jwtToken });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);

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
    const response = await axiosGetById({ endPoint: "user", query: "userId", id: userId });
    return response.data;
  }
);






export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
    },
    setOtherUserDetail: (state) => {
      state.otherUserDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // GUEST USER LOGIN
      .addCase(loginGuestUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginGuestUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userId = action.payload._id;
        state.loggedInUser = action.payload;
      })
      // CHECKING USER WITH JWT TOKEN
      .addCase(checkUserWithJwtAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserWithJwtAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.preCheckUser = true;
        state.loggedInUser = action.payload;
        state.userId = action.payload._id;
      })
      .addCase(checkUserWithJwtAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.preCheckUser = true;
        state.loggedInUser = null;
      })
      // RESITERING USER
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userId = action.payload._id;
        state.loggedInUser = action.payload;
      })
      // LOGIN USER
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.userId = action.payload._id;
      })
      // GETTING OTHER USER DETAIL FOR SHOWING IN PROFILE PAGE
      .addCase(getOtherUserDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOtherUserDetailAsync.fulfilled, (state, action) => {
        state.otherUserDetail = action.payload;
      })
  },
});

export const { logoutUser, setOtherUserDetail } = userSlice.actions;

export const selectStatus = (state) => state.user.status;
export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectUserId = (state) => state.user.userId;
export const selectPreCheckUser = (state) => state.user.preCheckUser;
export const selectOtherUserDetail = (state) => state.user.otherUserDetail;

export default userSlice.reducer;
