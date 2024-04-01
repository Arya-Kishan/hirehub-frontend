import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosAddRemoveLikeComment, axiosDeleteById, axiosGetAll, axiosGetById, axiosPost } from '../../Helper/AxiosCall';

const initialState = {
  status: 'idle',
  userPosts: null,
  myPosts: null,
  myNotifications: null,
  likeDrawer: {show:false,data:null},
  commentDrawer: {show:false,data:null},
  postDrawer: null,
  dialog: { show: false, type: "", id: 0 },
};


export const addPostAsync = createAsyncThunk(
  'community/addPost',
  async (formData) => {
    const response = await axiosPost({ data: formData, endPoint: "post", successMessage: "Posted", errorMessage: "Not Posted" });
    return response.data;
  }
);

export const fetchPostAsync = createAsyncThunk(
  'community/fetchPost',
  async (query="") => {
    const response = await axiosGetAll({endPoint:"post",query:query});
    return response.data;
  }
);

export const fetchMyPostAsync = createAsyncThunk(
  'community/fetchMyPost',
  async (userId) => {
    console.log("fetching user post");
    const response = await axiosGetById({ endPoint: "post", query: "userId", id: userId });
    return response.data;
  }
);


// used below to send frined request notification with senderid and receiver id
export const sendFriendRequestAsync = createAsyncThunk(
  'community/sendFriendRequest',
  async (formData) => {
    console.log("ADDING FRINED REQUEST NOTIFICATION");
    const response = await axiosPost({ data: formData, endPoint: "notification", errorMessage: "Request Not Sent", successMessage: "Request Sent" });
    return response.data;
  }
);

export const getNotificationsAsync = createAsyncThunk(
  'community/getNotifications',
  async (userId) => {
    const response = await axiosGetById({ endPoint: "notification", query: "userId", id: userId });
    return response.data;
  }
);

export const handleRequestAsync = createAsyncThunk(
  'community/handleRequest',
  async ({ query, notificationId }) => {
    console.log("HANDLING REQUEST ACCEPT OR REJECT");
    console.log(query);
    const response = await axiosDeleteById({ endPoint: "notification", query: query, id: notificationId });
    return response.data;
  }
);


export const addRemoveLikeAsync = createAsyncThunk(
  'community/addLike',
  async (query) => {
    console.log("ADDING LIKE");
    const response = await axiosAddRemoveLikeComment({ endPoint: "post/likeComment", query: query });
    return response.data;
  }
);

// TO HANDLE COMMENTS OF POST
export const addRemoveCommentAsync = createAsyncThunk(
  'community/addRemoveComment',
  async (query) => {
    console.log("ADDING LIKE");
    const response = await axiosAddRemoveLikeComment({ endPoint: "post/likeComment", query: query });
    return response.data;
  }
);


export const handleDeletePostAsync = createAsyncThunk(
  'community/ handleDeletePost',
  async (postId) => {
    const response = await axiosDeleteById({ endPoint: "post", query: "postId", id: postId, successMessage: "DELETED", errorMessage: "NOT DELETED" });
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
    setLikeDrawer: (state, action) => {
      state.likeDrawer = action.payload;
    },
    setCommentDrawer: (state, action) => {
      state.commentDrawer = action.payload;
    },
    setPostDrawer: (state, action) => {
      state.postDrawer = action.payload;
    },
    setMyPost: (state, action) => {
      state.myPosts = null;
    },
    setDialog: (state, action) => {
      state.dialog = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
    // ADDING POST
      .addCase(addPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      // FETCHING ALL POST
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userPosts = action.payload;
      })
      // FETCHING USER POST
      .addCase(fetchMyPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.myPosts = action.payload;
      })
      // HANDLING LIKES
      .addCase(addRemoveLikeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRemoveLikeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.userPosts.findIndex((e) => e._id === action.payload._id);
        state.userPosts.splice(index, 1, action.payload);
        if (state.myPosts) {
          let index2 = state.myPosts?.findIndex((e) => e._id === action.payload._id);
          state.myPosts.splice(index2, 1, action.payload);
        }
      })
      // HANDLING COMMENT
      .addCase(addRemoveCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRemoveCommentAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.commentDrawer.data = action.payload;
        state.postDrawer = { data: action.payload, show: state.postDrawer.show };
        let index = state.userPosts.findIndex((e) => e._id === action.payload._id);
        state.userPosts.splice(index, 1, action.payload);
        if (state.myPosts) {
          let index2 = state.myPosts?.findIndex((e) => e._id === action.payload._id);
          state.myPosts.splice(index2, 1, action.payload);
        }
      })
      // HANDLING FRIEND REQUEST
      .addCase(sendFriendRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendFriendRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      // NOTIFICATION
      .addCase(getNotificationsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotificationsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.myNotifications = action.payload;
      })
      // FRINED REQUEST
      .addCase(handleRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.myNotifications.findIndex((e) => e._id == action.payload._id)
        state.myNotifications.splice(index, 1, action.payload)
      })
      // DELETE POST
      .addCase(handleDeletePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleDeletePostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let index = state.myPosts.findIndex((e) => e._id == action.payload._id)
        state.myPosts.splice(index, 1)
      })
  },
});

export const { logoutUser, setCommentDrawer, setLikeDrawer, setPostDrawer, setMyPost, setDialog } = communitySlice.actions;

export const selectStatus = (state) => state.community.status;
export const selectUserPosts = (state) => state.community.userPosts;
export const selectMyPosts = (state) => state.community.myPosts;
export const selectLikeDrawer = (state) => state.community.likeDrawer;
export const selectCommentDrawer = (state) => state.community.commentDrawer;
export const selectMyNotification = (state) => state.community.myNotifications;
export const selectPostDrawer = (state) => state.community.postDrawer;
export const selectDialog = (state) => state.community.dialog;


export default communitySlice.reducer;