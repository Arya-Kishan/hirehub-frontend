import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from './applicationApi';

const initialState = {
  status: 'idle',
};


export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (user) => {
    const response = await loginUser(user);
    return response.data;
  }
);







export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
  },
});

export const { logoutUser } = applicationSlice.actions;

export const selectStatus = (state) => state.user.status;

export default applicationSlice.reducer;
