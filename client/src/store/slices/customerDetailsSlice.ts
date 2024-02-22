import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExerciseType } from "@/types/ExercisType";

interface CustomerDetailsState {
  deleteMood: boolean;
  addedCart: ExerciseType[];
}

const initialState: CustomerDetailsState = {
  deleteMood: false,
  addedCart: [],
};

const deleteFromCart = (oldCart: ExerciseType[], action: string) => {
  return oldCart.filter((item) => item._id !== action);
};

const customerDetailsSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {
    setDeleteMood(state, action) {
      state.deleteMood = action.payload;
    },
    setAddedCart(state, action) {
      if (action.payload.procesStatus === "delete") {
        state.addedCart = deleteFromCart(
          state.addedCart,
          action.payload.exercise
        );
      } else {
        const checkAllreadyAdded = state.addedCart.find(
          (item) => item._id === action.payload._id
        );
        if (!checkAllreadyAdded) {
          state.addedCart.push(action.payload);
        }
      }
    },
    clearAddedCart(state) {
      state.addedCart = [];
    },
  },
});

export const { setDeleteMood, setAddedCart, clearAddedCart } =
  customerDetailsSlice.actions;

export const selectDeleteMood = (state: RootState) =>
  state.customerDetailsReducer.deleteMood;

export const selectAddedCart = (state: RootState) =>
  state.customerDetailsReducer.addedCart;

export const customerDetailsReducer = customerDetailsSlice.reducer;
