import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/auth/authSlice';
import todosReducer from './components/todos/todoSlice';
import emailsReducer from './components/emails/emails';
import eventsReducer from './components/events/events';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    emails: emailsReducer,
    events: eventsReducer,
  },
});

export default store;
