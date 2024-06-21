import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInboxState {
  selectedChat: {
    _id: string;
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
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
  },
});

export const { selectChat } = inboxSlice.actions;

export const selectSelectedChat = (state: RootState) =>
  state.inboxReducer.selectedChat;

export const inboxReducer = inboxSlice.reducer;
