import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DrawerState {
  drawerVisible: boolean;
  drawerProps: {
    children?: React.ReactNode;
    title: string;
    footer?: React.ReactNode;
  };
}

const initialState: DrawerState = {
  drawerVisible: false,
  drawerProps: {
    children: undefined,
    title: "",
    footer: undefined,
  },
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setShowDrawer: (state, action) => {
      state.drawerVisible = true;
      state.drawerProps = action.payload;
    },
    setHideDrawer: (state) => {
      state.drawerVisible = false;
      state.drawerProps = {
        children: undefined,
        title: "",
        footer: undefined,
      };
    },
  },
});

export const { setShowDrawer, setHideDrawer } = drawerSlice.actions;

export const selectDrawerVisible = (state: RootState) =>
  state.drawerReducer.drawerVisible;

export const selectDrawerProps = (state: RootState) =>
  state.drawerReducer.drawerProps;

export const drawerReducer = drawerSlice.reducer;
