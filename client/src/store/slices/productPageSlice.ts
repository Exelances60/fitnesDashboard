import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { productsType } from "@/models/dataTypes";

interface ProductPageState {
  product: productsType;
  editModalVisible: boolean;
  orderModalVisible: boolean;
}

const initialState: ProductPageState = {
  product: {} as productsType,
  editModalVisible: false,
  orderModalVisible: false,
};

export const productPageSlice = createSlice({
  name: "productPage",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      if (state.product !== action.payload) {
        state.product = action.payload;
      }
    },
    setEditModalVisible: (state, action) => {
      state.editModalVisible = action.payload;
    },
    setOrderModalVisible: (state, action) => {
      state.orderModalVisible = action.payload;
    },
  },
});

export const { setProduct, setEditModalVisible, setOrderModalVisible } =
  productPageSlice.actions;

export const selectProduct = (state: RootState) => state.productPage.product;
export const selectEditModalVisible = (state: RootState) =>
  state.productPage.editModalVisible;
export const selectOrderModalVisible = (state: RootState) =>
  state.productPage.orderModalVisible;

export const productPageReducer = productPageSlice.reducer;
