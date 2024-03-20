import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetAll, axiosGetById, axiosPost } from '../../Helper/AxiosCall';

const initialState = {
  status: 'idle',
  userPosts:null,
  myPosts:null,
};


export const addPostAsync = createAsyncThunk(
  'community/addPost',
  async (formData) => {
    const response = await axiosPost({data:formData,endPoint:"post",successMessage:"Posted",errorMessage:"Not Posted"});
    return response.data;
  }
);

export const fetchPostAsync = createAsyncThunk(
  'community/fetchPost',
  async (formData) => {
    const response = await axiosGetAll("post");
    return response.data;
  }
);

export const fetchMyPostAsync = createAsyncThunk(
  'community/fetchMyPost',
  async (userId) => {
    console.log("fetching user post");
    const response = await axiosGetById({endPoint:"post",query:"userId",id:userId});
    return response.data;
  }
);








export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userPosts = action.payload;
      })
      .addCase(fetchMyPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.myPosts = action.payload;
      })
  },
});

export const { logoutUser } = communitySlice.actions;

export const selectStatus = (state) => state.community.status;
export const selectUserPosts = (state) => state.community.userPosts;
export const selectMyPosts = (state) => state.community.myPosts;

export default communitySlice.reducer;
