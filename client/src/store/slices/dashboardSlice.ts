import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DashboardState {
  chartsType: string;
}

const initialState: DashboardState = {
  chartsType: "orderCompleted",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setChartsType: (state, action) => {
      state.chartsType = action.payload;
    },
  },
});

export const { setChartsType } = dashboardSlice.actions;

export const selectChartsType = (state: RootState) =>
  state.dashboardReducer.chartsType;

export const dashboardReducer = dashboardSlice.reducer;
