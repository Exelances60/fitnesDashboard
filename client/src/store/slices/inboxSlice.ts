import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { clear } from "console";

interface IInboxState {
  selectedChat: {
    _id: string;
    employeeId: string;
    email: string;
    profilePicture: string;
    messages: any[];
    participants: any[];
  } | null;
}

const initialState: IInboxState = {
  selectedChat: null,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setChat(state, action) {
      state.selectedChat = action.payload;
    },
    deleteMessageAction(state, action) {
      if (state.selectedChat) {
        const newMessages = state.selectedChat.messages.map((msg) =>
          msg._id === action.payload
            ? { ...msg, content: "This message has been deleted" }
            : msg
        );
        state.selectedChat.messages = newMessages;
      }
    },
    setMessagesAction(state, action) {
      if (state.selectedChat) {
        state.selectedChat.messages.push(action.payload);
      }
    },
    clearChat(state) {
      state.selectedChat = null;
    },
  },
});

export const { setChat, deleteMessageAction, setMessagesAction, clearChat } =
  inboxSlice.actions;

export const selectChat = (state: RootState) => state.inboxReducer.selectedChat;

export const inboxReducer = inboxSlice.reducer;
