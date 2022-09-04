import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/auth/authSlice';
import todosReducer from './components/todos/todoSlice';
import emailsReducer from './components/emails/emails';
import emailsReducer from './components/calendars/calendars';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    emails: emailsReducer,
    calendars: calendarsReducer,
  },
});

export default store;
