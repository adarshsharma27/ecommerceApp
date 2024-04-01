import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "../features/AuthenticationSlice";
import ProductsReducer from "../features/ProductsSlice"
export const store = configureStore({
  reducer: {
    AuthenticationReducer,
    ProductsReducer
  },
});
