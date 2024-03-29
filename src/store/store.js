import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "../features/AuthenticationSlice";

export const store = configureStore({
  reducer: {
    AuthenticationReducer,
  },
});
