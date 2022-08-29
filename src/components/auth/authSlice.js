import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: {},
  currentUserUid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    //JR: fetch this user from collection(db, 'users') instead of from auth
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setUserUid(state, action) {
      state.currentUserUid = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser, setUserUid } = authSlice.actions;
export default authSlice.reducer;
