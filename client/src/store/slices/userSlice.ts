import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { deleteCookie } from "cookies-next";
interface UserState {
  user: OwnerType | null;
  menuKeys: "dashboard" | "users" | "products" | "orders" | "settings";
  productCategory: string[];
}

const initialState: UserState = {
  user: null,
  menuKeys: "dashboard",
  productCategory: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.productCategory = action.payload.productCategory;
    },
    setMenuKeys: (state, action) => {
      state.menuKeys = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.productCategory = [];
      deleteCookie("token");
      state.menuKeys = "dashboard";
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
  },
});

export const { setUser, setMenuKeys, logout, setProductCategory } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectMenuKeys = (state: RootState) => state.user.menuKeys;
export const selectProductCategory = (state: RootState) =>
  state.user.productCategory;
export const userReducer = userSlice.reducer;
