
import { createSlice, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import {api} from '../../api/index'

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

export const apiFeature = createSlice({
  name: 'Api',
  initialState: {
    loading: false,
    list: [],
    errors: [],
  },
  reducers: {
    fetchProjectsRequest: state => {
      state.loading = true;
      state.errors = [];
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.errors = [];
    },
    fetchProjectsFail: (state, action) => {
      state.loading = false;
      state.errors.push(action);
    },
    postProjects: state => {
      state.loading = true;
    },
    updateProjectsList: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

function* fetchProducts(actions) {
  try {
    const payload = yield call(api.todos.getAll, actions.payload);
    yield put(fetchProjectsSuccess(payload.data));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}

function* postProjectsWorker(actions) {
  try {
  
    yield call(
      axios
        .post('http://localhost:3000/api/projects', {
          projectName: actions.payload.name,
          description: actions.payload.description,
          projectCreator: 'bla',
        })
        .then(data => {
          console.log('axios', data);

          updateProjectsList(data.data);
        })
        .catch(error => {
          console.log('err', error);
        })
    );
    yield put(fetchProjectsSuccess(actions.payload));
  } catch (e) {
    yield put(fetchProjectsFail(e.message));
  }
}

export function* watchFetchProjects() {
  yield takeEvery(fetchProjectsRequest().type, fetchProducts);
  yield takeEvery(postProjects().type, postProjectsWorker);
}



function* rootSaga() {
  yield all([watchFetchTodos()]);
}

const initialiseSagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(),initialiseSagaMiddleware];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

// initialiseSagaMiddleware.run(rootSaga);

export default store;
