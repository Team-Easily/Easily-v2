import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";

const initialState = {
  isLoggedIn: false,
  user: null,
  stsTokenManager: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setStsTokenManager(state, action) {
      state.stsTokenManager = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser, setStsTokenManager } = authSlice.actions;
export default authSlice.reducer;
