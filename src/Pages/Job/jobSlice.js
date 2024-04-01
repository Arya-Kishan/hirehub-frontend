import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosDeleteById, axiosGetAll, axiosGetById, axiosPost, axiosUpdateById } from '../../Helper/AxiosCall';

const initialState = {
  status: 'idle',
  allJobs: null,
  jobDetail: null,
  countriesArr:null,
};


export const addJobAsync = createAsyncThunk(
  'job/addJob',
  async (formData) => {
    const response = await axiosPost({ data: formData, endPoint: "job", successMessage: "Job Added", errorMessage: "Job Not Added" });
    return response.data;
  }
);

export const fetchJobsAsync = createAsyncThunk(
  'job/fetchJobs',
  async (query="") => {
    const response = await axiosGetAll({ endPoint: "job", query: query });
    return response.data;
  }
);

export const fetchCountriesAsync = createAsyncThunk(
  'job/fetchCountries',
  async (query="") => {
    const response = await axiosGetAll({ endPoint: "job/country", query: query });
    return response.data;
  }
);

export const fetchJobQueryAsync = createAsyncThunk(
  'job/fetchJobDetail',
  async (jobId) => {
    const response = await axiosGetById({ endPoint: "job", query: "jobId", id: jobId });
    return response.data;
  }
);


export const fetchUserJobAsync = createAsyncThunk(
  'job/fetchUserJob',
  async ({ id, query }) => {
    const response = await axiosGetById({ endPoint: "job", query: query, id: id });
    return response.data;
  }
);


export const updateJobAsync = createAsyncThunk(
  'job/updateJob',
  async ({ formData, id }) => {
    const response = await axiosUpdateById({ data: formData, endPoint: "job", query: "jobId", id: id, successMessage: "Job Updated", errorMessage: "Job Not Updated" });
    return response.data;
  }
);

export const deleteJobAsync = createAsyncThunk(
  'job/deleteJob',
  async (jobId) => {
    const response = await axiosDeleteById({ endPoint: "job", query: "jobId", id: jobId, successMessage: "Job Deleted", errorMessage: "Job Not Deleted" });
    return response.data;
  }
);






export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allJobs = action.payload;
      })
      .addCase(fetchUserJobAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserJobAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allJobs = action.payload;
      })
      .addCase(fetchJobQueryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobQueryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobDetail = action.payload;
      })
      .addCase(updateJobAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJobAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(deleteJobAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJobAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchCountriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.countriesArr = action.payload
      })
  },
});

export const { logoutUser } = jobSlice.actions;

export const selectStatus = (state) => state.job.status;
export const selectJobs = (state) => state.job.allJobs;
export const selectCountries = (state) => state.job.countriesArr;
// I USED THIS BELOW SELECTJ... FOR SHOWING DETAILS OF JOB AND UPDATING
export const selectJobDetail = (state) => state.job.jobDetail;

export default jobSlice.reducer;

// everything
// http://localhost:8080/job/all?experience=[1,2]&type=["Internship"]&category=["web"]&salaryFrom=10000&salaryTo=40000


// Range Salary :
// job/all?salaryFrom=10000&salaryTo=14000

// Category
// job/all?category=["web","frontend"]

// experience
// job/all?experience=[1,4,6]

// typr
// job/all?type=["Remote","Full-Time"]

// country
// job/all?country=brazil