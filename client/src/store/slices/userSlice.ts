import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const userReducer = userSlice.reducer;
