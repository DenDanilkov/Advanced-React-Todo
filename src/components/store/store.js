import {
  createSlice,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import { takeEvery, put, call } from "redux-saga/effects";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { api } from "../../api/index";

export const todosFeature = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    title: "Welcome to my Todo App!!!",
    todoLists: []
  },
  reducers: {
    createTodoList: (state, action) => {
      state.todoLists.push(action.payload);
    },
    deleteTodoList: (state, action) => {
      return {
        todoLists: state.todoLists.filter(item => {
          return item.id !== action.payload;
        })
      };
    },
    addTodoItem: (state, action) => {
      return {
        todoLists: state.todoLists.map((item, i) => {
          if (action.payload.todoId === item.id) {
            return {
              title: item.title,
              id: item.id,
              TodoItems: [
                ...item.TodoItems,
                action.payload
              ]
            };
          } else {
            return item;
          }
        })
      };
    },
    deleteTodoItem: (state, action) => {
      return {
        todoLists: state.todoLists.map(item => {
          if (action.payload[0] === item.id) {
            return {
              title: item.title,
              id: item.id,
              TodoItems: item.TodoItems.filter(
                member => member.id !== action.payload[1]
              )
            };
          } else {
            return item;
          }
        })
      };
    },
    todoItemCompleted: (state, action) => {
      return {
        todoLists: state.todoLists.map(item => {
          if (action.payload[0] === item.id) {
            return {
              title: item.title,
              id: item.id,
              TodoItems: item.TodoItems.map(member =>
                member.id === action.payload[1]
                  ? { title: member.title, id: member.id, done: action.payload[2].done }
                  : member
              )
            };
          } else {
            return item;
          }
        })
      };
    },
    fetchTodosRequest: state => {
      state.loading = true;
      state.errors = [];
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.todoLists = action.payload;
      state.errors = [];
    },
    fetchProjectsFail: (state, action) => {
      state.loading = false;
      /*state.errors.push(action);*/
    },
    postTodoListRequest: (state, action) => {
      state.loading = true;
      state.errors = [];
    },
    deleteTodoListRequest: (state, action) => {
      state.loading = true;
      state.errors = [];
    },
    postTodoItemRequest: (state, action) => {
      state.loading = true;
      state.errors = [];
    },
    deleteTodoItemRequest: (state, action) => {
      state.loading = true;
      state.errors = [];
    },
    updateTodoItemRequest: (state, action) => {
      state.loading = true;
      state.errors = [];
    }
  }
});

export const {
  createTodoList,
  deleteTodoList,
  addTodoItem,
  deleteTodoItem,
  todoItemCompleted,
  fetchTodosRequest,
  fetchProjectsSuccess,
  fetchProjectsFail,
  postTodoListRequest,
  deleteTodoListRequest,
  postTodoItemRequest,
  deleteTodoItemRequest,
  updateTodoItemRequest
} = todosFeature.actions;

const reducer = {
  todos: todosFeature.reducer
};

function* fetchTodosWorker(actions) {
  try {
    const payload = yield call(api.todos.getAll, actions.payload);

    yield put(fetchProjectsSuccess(payload));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}

function* postTodoListWorker(actions) {
  try {
    const payload = yield call(api.todos.createTodoList, actions.payload);

    yield put(createTodoList(payload));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}

function* deleteTodoListWorker(actions) {
  try {
    yield call(api.todos.deleteTodoList, actions.payload.id);

    yield put(deleteTodoList(actions.payload.id));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}

function* postTodoItemWorker(actions) {
  try {
    const payload = yield call(api.todos.createTodoItem, actions.payload);

    yield put(addTodoItem(payload));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}
function* deleteTodoItemWorker(actions) {
  try {
   yield call(api.todos.deleteTodoItem, actions.payload);

    yield put(deleteTodoItem(actions.payload));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}
function* updateTodoItemWorker(actions) {
  try {
   yield call(api.todos.updateTodoItem, actions.payload);

    yield put(todoItemCompleted(actions.payload));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}

export function* requestTodosWatcher() {
  yield takeEvery(fetchTodosRequest().type, fetchTodosWorker);
  yield takeEvery(postTodoListRequest().type, postTodoListWorker);
  yield takeEvery(deleteTodoListRequest().type, deleteTodoListWorker);
  yield takeEvery(postTodoItemRequest().type, postTodoItemWorker);
  yield takeEvery(deleteTodoItemRequest().type, deleteTodoItemWorker);
  yield takeEvery(updateTodoItemRequest().type, updateTodoItemWorker);
}

function* rootSaga() {
  yield all([requestTodosWatcher()]);
}

const initialiseSagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), initialiseSagaMiddleware];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production"
});

initialiseSagaMiddleware.run(rootSaga);

export default store;
