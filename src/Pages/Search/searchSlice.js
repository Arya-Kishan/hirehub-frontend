import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetById, axiosPost, axiosSearch } from '../../Helper/AxiosCall';




const initialState = {
  status: 'idle',
  searchResult:null,
};





export const searchJobAsync = createAsyncThunk(
  'search/searchJob',
  async ({query}) => {
    const response = await axiosSearch({endPoint:"job/all/0",query:query});
    return response.data;
  }
);

export const searchUserAsync = createAsyncThunk(
  'search/searchUser',
  async ({query}) => {
    console.log(query);
    const response = await axiosSearch({endPoint:"user/all",query:query});
    return response.data;
  }
);




export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchJobAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchJobAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchResult = action.payload;
      })
      .addCase(searchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchResult = action.payload;
      })
  },
});

export const { logoutUser } = searchSlice.actions;

export const selectStatus = (state) => state.search.status;
export const selectSearchResult = (state) => state.search.searchResult;

export default searchSlice.reducer;
