import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetById, axiosPost, axiosSearch } from '../../Helper/AxiosCall';




const initialState = {
  status: 'idle',
  jobSearchResult: [],
  userSearchResult: [],
  searchLoader: { message: '', loader: "idle" },
};





export const searchJobAsync = createAsyncThunk(
  'search/searchJob',
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axiosSearch({ endPoint: "job/all/0", query: query });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);

export const searchUserAsync = createAsyncThunk(
  'search/searchUser',
  async ({ query }, { rejectWithValue }) => {
    console.log(query);
    try {
      const response = await axiosSearch({ endPoint: "user/all", query: query });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);




export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setJobSearchResult: (state) => {
      state.jobSearchResult = null;
    },
    setUserSearchResult: (state) => {
      state.userSearchResult = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchJobAsync.pending, (state) => {
        state.status = 'loading';
        state.searchLoader = { message: '', loader: "loading" };
      })
      .addCase(searchJobAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobSearchResult = action.payload;
        state.searchLoader = { message: 'success', loader: "idle" };
      })
      .addCase(searchJobAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.jobSearchResult = null;
        state.searchLoader = { message: 'failure', loader: "idle" };
      })

      .addCase(searchUserAsync.pending, (state) => {
        state.status = 'loading';
        state.searchLoader = { message: '', loader: "loading" };
      })
      .addCase(searchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userSearchResult = action.payload;
        state.searchLoader = { message: 'success', loader: "idle" };
      })
      .addCase(searchUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.searchLoader = { message: 'failure', loader: "idle" };
      })
  },
});

export const { setJobSearchResult, setUserSearchResult } = searchSlice.actions;

export const selectStatus = (state) => state.search.status;
export const selectSearchLoader = (state) => state.search.searchLoader;

export const selectUserSearchResult = (state) => state.search.userSearchResult;
export const selectJobSearchResult = (state) => state.search.jobSearchResult;

export default searchSlice.reducer;
