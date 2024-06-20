import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  chartsType: string;
  chartsMode: "area" | "line" | "bar";
  fastTable: string;
}

const initialState: DashboardState = {
  chartsType: "orderCompleted",
  chartsMode: "area",
  fastTable: "product",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setChartsType: (state, action) => {
      state.chartsType = action.payload;
    },
    setChartsMode: (state, action) => {
      state.chartsMode = action.payload;
    },
    setFastTable: (state, action) => {
      state.fastTable = action.payload;
    },
  },
});

export const { setChartsType, setChartsMode, setFastTable } =
  dashboardSlice.actions;

export const selectChartsType = (state: RootState) =>
  state.dashboardReducer.chartsType;

export const selectChartsMode = (state: RootState) =>
  state.dashboardReducer.chartsMode;

export const selectFastTable = (state: RootState) =>
  state.dashboardReducer.fastTable;

export const dashboardReducer = dashboardSlice.reducer;
