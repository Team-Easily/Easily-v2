import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  event: {},
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = [...action.payload];
    },
    setEvent(state, action) {
      state.event = action.payload;
    },
    addToEvents(state, action) {
      state.events.push(action.payload);
    },
  },
});

export const { setEvents, setEvent, addToEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
