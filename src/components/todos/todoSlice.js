import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    addToTodos(state, action) {
      state.todos.push(action.payload);
    },
  },
});

export const { setTodos, addToTodos } = todosSlice.actions;
export default todosSlice.reducer;
