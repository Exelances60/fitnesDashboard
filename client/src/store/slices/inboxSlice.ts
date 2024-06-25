import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInboxState {
  selectedChat: {
    _id: string;
    employeeId: string;
    email: string;
    profilePicture: string;
    messages: any[];
    participants: any[];
  } | null;
  loading: {
    fetchingChat: boolean;
    sendingMessage: boolean;
    deletingMessage: boolean;
  };
}

const initialState: IInboxState = {
  selectedChat: null,
  loading: {
    fetchingChat: false,
    sendingMessage: false,
    deletingMessage: false,
  },
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setChat(state, action) {
      state.selectedChat = action.payload;
      state.loading.fetchingChat = false;
    },
    deleteMessageAction(state, action) {
      if (state.selectedChat) {
        const newMessages = state.selectedChat.messages.map((msg) =>
          msg._id === action.payload
            ? { ...msg, content: "This message has been deleted" }
            : msg
        );
        state.selectedChat.messages = newMessages;
        state.loading.deletingMessage = false;
      }
    },
    setMessagesAction(state, action) {
      if (state.selectedChat) {
        state.selectedChat.messages.push(action.payload);
        state.loading.sendingMessage = false;
      }
    },
    setLoading(state, action) {
      state.loading = { ...state.loading, ...action.payload };
    },
    clearChat(state) {
      state.selectedChat = null;
      state.loading = {
        fetchingChat: false,
        sendingMessage: false,
        deletingMessage: false,
      };
    },
  },
});

export const {
  setChat,
  deleteMessageAction,
  setMessagesAction,
  clearChat,
  setLoading,
} = inboxSlice.actions;

export const selectChat = (state: RootState) => state.inboxReducer.selectedChat;
export const selectLoading = (state: RootState) => state.inboxReducer.loading;
export const inboxReducer = inboxSlice.reducer;
