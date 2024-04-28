import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NavigationState {
  currency: string;
}

const initialState: NavigationState = {
  currency: "USD",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { changeCurrency } = navigationSlice.actions;
export const selectCurrency = (state: RootState) =>
  state.navigationReducer.currency;

export const navigationReducer = navigationSlice.reducer;
