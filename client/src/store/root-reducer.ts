import { combineReducers } from "redux";
import { userReducer } from "./slices/userSlice";
import { productPageReducer } from "./slices/productPageSlice";
import { modalReducer } from "./slices/modalSlice";
import { drawerReducer } from "./slices/drawerSlice";
import { customerDetailsReducer } from "./slices/customerDetailsSlice";
import { invoiceReducer } from "./slices/invoiceSlice";
import { navigationReducer } from "./slices/navigationSlice";
import { dashboardReducer } from "./slices/dashboardSlice";
import { inboxReducer } from "./slices/inboxSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  productPage: productPageReducer,
  modalReducer: modalReducer,
  drawerReducer: drawerReducer,
  customerDetailsReducer: customerDetailsReducer,
  invoiceReducer: invoiceReducer,
  navigationReducer: navigationReducer,
  dashboardReducer: dashboardReducer,
  inboxReducer: inboxReducer,
});
