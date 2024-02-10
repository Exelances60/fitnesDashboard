import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  modalType: false as boolean,
  modalProps: {} as {
    children?: React.ReactNode;
    title: string;
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalType = true;
      state.modalProps = action.payload;
    },
    setHideModal: (state) => {
      state.modalType = false;
      state.modalProps = {} as {
        children?: React.ReactNode;
        title: string;
      };
    },
  },
});

export const { showModal, setHideModal } = modalSlice.actions;

export const selectModalType = (state: RootState) =>
  state.modalReducer.modalType;
export const selectModalProps = (state: RootState) =>
  state.modalReducer.modalProps;

export const modalReducer = modalSlice.reducer;
