import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosDeleteById, axiosGetAll, axiosGetById, axiosPost, axiosUpdateById } from '../../Helper/AxiosCall';

const initialState = {
    status: 'idle',
    blogs: null,
    myBlogs: null,
    blogDrawer: { show: false, data: null },
    addingBlogLoader: { result: null, loader: "idle" },
};


export const getAllBlogAsync = createAsyncThunk(
    'auth/getAllBlog',
    async () => {
        const response = await axiosGetAll({ endPoint: "blog/all", query: "" });
        return response.data;
    }
);

export const getMyBlogAsync = createAsyncThunk(
    'auth/getMyBlog',
    async (userId) => {
        const response = await axiosGetById({ endPoint: "blog", query: "userId", id: userId });
        return response.data;
    }
);

export const addBlogAsync = createAsyncThunk(
    'auth/addBlog',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosPost({ data: formData, endPoint: "blog", errorMessage: "BLOG NOT ADDED", successMessage: "BLOG ADDED" });
            return response.data;
        } catch (error) {
            return response.data;
        }
    }
);

export const updateBlogAsync = createAsyncThunk(
    'auth/updateBlog',
    async ({ data, blogId }) => {
        console.log(data);
        console.log(blogId);
        const response = await axiosUpdateById({ data: data, endPoint: "blog", query: "blogId", id: blogId, errorMessage: "BLOG NOT UPDATED", successMessage: "BLOG UPDATED" });
        return response.data;
    }
);


export const deleteBlogAsync = createAsyncThunk(
    'auth/deleteBlog',
    async (blogId) => {
        const response = await axiosDeleteById({ endPoint: "blog", query: "blogId", id: blogId, errorMessage: "BLOG NOT DELETED", successMessage: "BLOG DELETED" });
        return response.data;
    }
);






export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogDrawer: (state, action) => {
            state.blogDrawer = action.payload;
        },
        setAddingBlogLoader: (state, action) => {
            state.addingBlogLoader = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // GET ALL BLOGS
            .addCase(getAllBlogAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllBlogAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.blogs = action.payload;
            })
            // GET USER BLOGS BY ID
            .addCase(getMyBlogAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyBlogAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.myBlogs = action.payload;
            })
            // ADD BLOG
            .addCase(addBlogAsync.pending, (state) => {
                state.status = 'loading';
                state.addingBlogLoader = { result: null, loader: 'loading' };
            })
            .addCase(addBlogAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.addingBlogLoader = { result: "success", loader: "idle" };
                state.myBlogs?.push(action.payload);
            })
            .addCase(addBlogAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.addingPostLoader = { result: "failure", loader: "idle" };

            })
            // UPDATE BLOG
            .addCase(updateBlogAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateBlogAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                let index = state.blogs.findIndex((e) => e._id === action.payload._id);
                state.blogs.splice(index, 1, action.payload);
            })
            // DELETE BLOGS
            .addCase(deleteBlogAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBlogAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                let index = state.blogs.findIndex((e) => e._id === action.payload._id);
                state.blogs.splice(index, 1);
            })
    },
});

export const { setBlogDrawer, setAddingBlogLoader } = blogSlice.actions;

export const selectStatus = (state) => state.blog.status;
export const selectBlogs = (state) => state.blog.blogs;
export const selectMyBlogs = (state) => state.blog.myBlogs;
export const selectBlogDrawer = (state) => state.blog.blogDrawer;
export const selectAddingBlogLoader = (state) => state.blog.addingBlogLoader;


export default blogSlice.reducer;
