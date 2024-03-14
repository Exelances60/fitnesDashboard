import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface UserState {
  user: jwtUserDecode | null;
  menuKeys: "dashboard" | "users" | "products" | "orders" | "settings";
  userInfo: OwnerType | null;
}

const initialState: UserState = {
  user: null,
  menuKeys: "dashboard",
  userInfo: null,
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
    setUserInfoRedux: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, setMenuKeys, setUserInfoRedux } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectMenuKeys = (state: RootState) => state.user.menuKeys;
export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const userReducer = userSlice.reducer;
