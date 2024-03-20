import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetAll } from '../../Helper/AxiosCall';

const initialState = {
    status: 'idle',
    employerId: null,
};


export const getDataAsync = createAsyncThunk(
    'form/getData',
    async (formData) => {
        const response = await axiosGetAll("local");
        return response.data;
    }
);







export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setEmployerId: (state, action) => {
            state.employerId = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
    },
});

export const { setEmployerId } = formSlice.actions;

export const selectStatus = (state) => state.job.status;
export const selectEmployerId = (state) => state.form.employerId;

export default formSlice.reducer;
