import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  todo: {},
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
    setTodo(state, action) {
      state.todo = action.payload;
    },
  },
});

export const { setTodos, addToTodos, setTodo } = todosSlice.actions;
export default todosSlice.reducer;
