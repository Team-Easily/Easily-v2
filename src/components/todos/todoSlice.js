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
      state.todos = [...action.payload];
    },
    setTodo(state, action) {
      state.todo = action.payload;
    },
    editTodo(state, action) {
      let { todos } = state;
      state.todos = todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
  },
});

export const { setTodos, addToTodos, setTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
