import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  userData: null,
};

export const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logOut: (state, action) => {
      state.status = false;
      state.userData = action.payload;
    },
  },
});

export const { logIn, logOut } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
