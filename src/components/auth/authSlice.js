import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUser: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser } = authSlice.actions;
export default authSlice.reducer;
