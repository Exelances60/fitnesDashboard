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
  },
});

export const { setChat } = inboxSlice.actions;

export const selectChat = (state: RootState) => state.inboxReducer.selectedChat;

export const inboxReducer = inboxSlice.reducer;
