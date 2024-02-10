import { combineReducers } from "redux";
import { userReducer } from "./slices/userSlice";
import { productPageReducer } from "./slices/productPageSlice";
import { modalReducer } from "./slices/modalSlice";
import { drawerReducer } from "./slices/drawerSlice";
export const rootReducer = combineReducers({
  user: userReducer,
  productPage: productPageReducer,
  modalReducer: modalReducer,
  drawerReducer: drawerReducer,
});
