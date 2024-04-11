import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InvoiceState {
  selectedInvoiceData: OrdersType | null;
}

const initialState: InvoiceState = {
  selectedInvoiceData: null,
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setSelectedInvoiceData: (state, action) => {
      state.selectedInvoiceData = action.payload;
    },
  },
});

export const { setSelectedInvoiceData } = invoiceSlice.actions;
export const selectSelectedInvoiceData = (state: RootState) =>
  state.invoiceReducer.selectedInvoiceData;
export const invoiceReducer = invoiceSlice.reducer;
