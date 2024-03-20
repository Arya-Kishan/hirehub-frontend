import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addApplication } from './applicationApi';
import { axiosGetById, axiosPost } from '../../Helper/AxiosCall';

const initialState = {
  status: 'idle',
  applications:null,
};


export const addApplicationAsync = createAsyncThunk(
  'application/loginUser',
  async (formData) => {
    const response = await axiosPost({data:formData,endPoint:"application",successMessage:"Application Added",errorMessage:"Application Not Added"});
    return response.data;
  }
);

// USED APPLICANT_ID TO GET MINE APPLICATION WHICH I APPLY FOR JOB
// USED EMPLOYER_ID TO GET APPLICATION WHICH OTHER APPLICANT APPLY FOR JOB POSTED BY ME
export const getApplicationAsync = createAsyncThunk(
  'application/getMyApplication',
  async ({id,query}) => {
    const response = await axiosGetById({endPoint:"application",query:query,id:id});
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
      .addCase(addApplicationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addApplicationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getApplicationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApplicationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.applications = action.payload;
      })
  },
});

export const { logoutUser } = applicationSlice.actions;

export const selectStatus = (state) => state.application.status;
export const selectApplications = (state) => state.application.applications;

export default applicationSlice.reducer;
