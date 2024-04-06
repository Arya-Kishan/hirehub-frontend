import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosDeleteById, axiosGetById, axiosPost, axiosUpdateById } from '../../Helper/AxiosCall';
import axios from 'axios';

const initialState = {
  status: 'idle',
  loginLoader: 'idle',
  loggedInUser: null,
  userId: null,
  otherUserDetail: null,
  preCheckUser: false,
  forgotPasswordLoader: 'idle',
  passwordChange: null,
  changePasswordLoader: 'idle',
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
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPost({ data: formData, endPoint: "user/login", errorMessage: "INVALID CREDENTIALS", successMessage: "LOGGED IN" });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);


export const getOtherUserDetailAsync = createAsyncThunk(
  'auth/getUserDetail',
  async (userId) => {
    const response = await axiosGetById({ endPoint: "user", query: "userId", id: userId });
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async ({ formData, userId }) => {
    console.log("updating user");
    const response = await axiosUpdateById({ data: formData, endPoint: "user", query: 'userId', id: userId, errorMessage: "NOT UPDATED", successMessage: "UPDATED" });
    return response.data;
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  'auth/forgotPassword',
  async (formData, { rejectWithValue }) => {
    console.log("SENDING EMAIL FOR FORGOT PASSWORD");
    try {
      const response = await axiosPost({ data: formData, endPoint: "user/forgotPassword", errorMessage: "EMAIL NOT SENT", successMessage: "EMAIL SENT" });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'auth/changePassword',
  async (formData, { rejectWithValue }) => {
    console.log("CHANGING PASSWORD");
    try {
      const response = await axiosPost({ data: formData, endPoint: "user/changePassword", errorMessage: "PASSWORD NOT CHANGED", successMessage: "PASSWORD CHANGED" });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);

export const deleteAccountAsync = createAsyncThunk(
  'user/deleteAccountAsync',
  async (userId) => {
    const response = await axiosDeleteById({ endPoint: "user", query: "userId", id: userId, successMessage: "DELETED", errorMessage: "NOT DELETED" });
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
        state.loginLoader = 'loading';
      })
      .addCase(loginGuestUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginLoader = 'idle';
        state.userId = action.payload._id;
        state.loggedInUser = action.payload;
      })
      .addCase(loginGuestUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loginLoader = 'idle';
        state.loggedInUser = null;
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
        state.loginLoader = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginLoader = 'idle';
        state.userId = action.payload._id;
        state.loggedInUser = action.payload;
      })
      // LOGIN USER
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.loginLoader = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loginLoader = 'idle';
        state.status = 'idle';
        state.userId = action.payload._id;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loginLoader = 'idle';
        state.loggedInUser = null;
      })
      // UPDATE USER
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      // GETTING OTHER USER DETAIL FOR SHOWING IN PROFILE PAGE
      .addCase(getOtherUserDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOtherUserDetailAsync.fulfilled, (state, action) => {
        state.otherUserDetail = action.payload;
      })
      // FORGOT PASSWORD
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.forgotPasswordLoader = 'loading';
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.forgotPasswordLoader = 'idle';
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.forgotPasswordLoader = 'idle';
      })
      // CHANGING PASSWORD
      .addCase(changePasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.changePasswordLoader = 'loading';
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.changePasswordLoader = 'idle';
        state.passwordChange = "success";
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.changePasswordLoader = 'idle';
      })
      .addCase(deleteAccountAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAccountAsync.fulfilled, (state, action) => {
        state.loggedInUser = null;
        state.userId = null;
      })
  },
});

export const { logoutUser, setOtherUserDetail } = userSlice.actions;

export const selectStatus = (state) => state.user.status;
export const selectLoginLoader = (state) => state.user.loginLoader;
export const selectChangePasswordLoader = (state) => state.user.changePasswordLoader;
export const selectForgotPasswordLoader = (state) => state.user.forgotPasswordLoader;
export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectUserId = (state) => state.user.userId;
export const selectPreCheckUser = (state) => state.user.preCheckUser;
export const selectOtherUserDetail = (state) => state.user.otherUserDetail;
export const selectPasswordChange = (state) => state.user.passwordChange;

export default userSlice.reducer;
