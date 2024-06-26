import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetAll } from '../../Helper/AxiosCall';

const initialState = {
    status: 'idle',
    drawer: false,
    drawerData: null,
};


export const getDataAsync = createAsyncThunk(
    'form/getData',
    async (formData) => {
        const response = await axiosGetAll({endPoint:"blog/all",query:""});
        return response.data;
    }
);







export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.drawer = action.payload;
        },
        setDrawerData: (state, action) => {
            state.drawerData = action.payload;
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

export const { setDrawerData, setDrawer } = formSlice.actions;

export const selectStatus = (state) => state.job.status;
export const selectDrawer = (state) => state.form.drawer;
export const selectDrawerData = (state) => state.form.drawerData;

export default formSlice.reducer;
