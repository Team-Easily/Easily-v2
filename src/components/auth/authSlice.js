import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: "",
  currentUser: {},
  userUid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setUserUid(state, action) {
      state.currentUser = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const { setIsLoggedIn, setCurrentUser, setUserUid, setAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
