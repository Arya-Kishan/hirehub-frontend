import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGetAll, axiosGetById, axiosPost, axiosSearch } from '../../Helper/AxiosCall';
import { globalSocket } from '../../App';




const initialState = {
  status: 'idle',
  friends: [],
  friendLoader: false,
  selectedUser: null,
  messages: { loader: false, data: [] },
  onlineUsers: [],
  unseenMessages: [],
  rightSideSlide: 'left-full'
};






export const getUserFriendsAsync = createAsyncThunk(
  'chat/getFriendsUser',
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axiosGetAll({ endPoint: "chat/friends", query: query });
      return response.data;
    } catch (error) {
      return response.data;
    }
  }
);

export const getMessagesAsync = createAsyncThunk(
  'chat/getMessages',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosPost({ data: data, endPoint: "chat/getMessages", errorMessage: "CAN'T GET MESSAGE", successMessage: 'Message Fetched' });
      return response.data?.data.messages;
    } catch (error) {
      return response.data;
    }
  }
);




export const socketSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = { loader: false, data: action.payload };
    },
    setUnseenMessages: (state, action) => {
      state.unseenMessages = (action.payload);
    },
    setRightSideSlide: (state, action) => {
      state.rightSideSlide = (action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserFriendsAsync.pending, (state) => {
        state.status = 'loading';
        state.friendLoader = true;
      })
      .addCase(getUserFriendsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.friends = action.payload;
        state.friendLoader = false;
      })
      .addCase(getUserFriendsAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.friends = [];
        state.friendLoader = false;
      })
      // GETTING CHAT MESSAGES
      .addCase(getMessagesAsync.pending, (state) => {
        state.status = 'loading';
        state.messages = { loader: true, data: [] };
      })
      .addCase(getMessagesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.messages = { loader: false, data: action.payload };
      })
      .addCase(getMessagesAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.messages = { loader: false, data: [] };
      })
  },
});

export const { setStatus, setSelectedUser, setOnlineUsers, setMessages, setUnseenMessages, setRightSideSlide } = socketSlice.actions;

export const selectStatus = (state) => state.chat.status;
export const selectFriends = (state) => state.chat.friends;
export const selectFriendLoader = (state) => state.chat.friendLoader;
export const selectOnlineUsers = (state) => state.chat.onlineUsers;
export const selectMessages = (state) => state.chat.messages;
export const selectUnseenMessages = (state) => state.chat.unseenMessages;
export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectRightSideSlide = (state) => state.chat.rightSideSlide;

export default socketSlice.reducer;


// http://localhost:8080/chat/friends?userId=65f9b6bf2f8c7fe881118a90
// http://localhost:8080/chat/getMessages
// http://localhost:8080/chat/addMessage