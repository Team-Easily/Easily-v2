import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  email: {},
};

export const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails(state, action) {
      state.emails = [...action.payload];
    },
    addToEmail(state, action) {
      state.emails.push(action.payload);
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { setEmails, addToEmail, setEmail } = emailsSlice.actions;
export default emailsSlice.reducer;
