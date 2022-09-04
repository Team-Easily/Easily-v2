import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  calendars: [],
  calendar: {},
  events: [],
  event: {},
};

export const calendarsSlice = createSlice({
  name: 'calendars',
  initialState,
  reducers: {
    setCalendars(state, action) {
      state.calendars = [...action.payload];
    },
    setCalendar(state, action) {
      state.calendar = action.payload;
    },
    addToCalendar(state, action) {
      state.calendars.push(action.payload);
    },
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

export const {
  setCalendars,
  setCalendar,
  addToCalendar,
  setEvents,
  setEvent,
  addToEvents,
} = calendarsSlice.actions;
export default calendarsSlice.reducer;
