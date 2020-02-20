
import { createSlice, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

export const todosFeature = createSlice({
  name: 'todos',
  initialState: {
    title: 'Welcome to my Todo App!!!',
    todoLists: []
  },
  reducers: {
    createTodoList: (state, action) => {
      return {
        todoLists: [
          ...state.todoLists,
          { title: action.payload.title, id: Date.now(), todos: [] }
        ]
      };
    },
    deleteTodoList: (state, action) => {
      return {
        todoLists: state.todoLists.filter(item => {
          return item.id !== action.payload.id;
        })
      };
    },
    addTodoItem: (state, action) => {
      return {
        todoLists: state.todoLists.map((item, i) => {
          if (action.payload.id === item.id) {
            return {title: item.title, id: item.id, todos: [...item.todos, {title: action.payload.title, id: Date.now(), done: false}] }
          } else {
            return item;
          }
        })
      };
    },
    deleteTodoItem: (state, action) => {
      return {
        todoLists: state.todoLists.map((item) => {
          if (action.payload.id === item.id) {
            return {
              title: item.title,
              id: item.id,
              todos: item.todos.filter((member) => member.id !== action.payload.todo_id)
            }
          } else {
            return item;
          }
        })
      };
    },
    todoItemCompleted: (state, action) => {
      return {
        todoLists: state.todoLists.map((item) => {
          if (action.payload.id === item.id) {
            return ({
              title: item.title,
              id: item.id,
              todos: item.todos.map((member) => member.id === action.payload.todo_id ? { title: member.title, id: member.id, done: !member.done } : member)
            });
          } else {
            return item;
          }
        })
      };
    },
  },
});

export const { createTodoList, deleteTodoList, addTodoItem, deleteTodoItem, todoItemCompleted } = todosFeature.actions;

const reducer = {
  todos: todosFeature.reducer,
}

const middleware = [...getDefaultMiddleware()];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
