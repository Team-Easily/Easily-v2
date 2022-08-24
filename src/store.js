import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/auth/authSlice';
import todosReducer from './components/todos/todoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export default store;
