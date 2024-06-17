import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { deleteCookie } from "cookies-next";
interface UserState {
  user: OwnerType | null;
  menuKeys: "dashboard" | "users" | "products" | "orders" | "settings";
}

const initialState: UserState = {
  user: null,
  menuKeys: "dashboard",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMenuKeys: (state, action) => {
      state.menuKeys = action.payload;
    },
    logout: (state) => {
      state.user = null;
      deleteCookie("token");
      state.menuKeys = "dashboard";
    },
  },
});

export const { setUser, setMenuKeys, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectMenuKeys = (state: RootState) => state.user.menuKeys;
export const userReducer = userSlice.reducer;
