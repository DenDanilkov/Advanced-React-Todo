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
      // console.log('acaascas',action.payload)
      // return {
      //   todoLists: [
      //     ...state.todoLists,
      //     action.payload
      //   ]
      // };
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
          if (action.payload.id === item.id) {
            return {
              title: item.title,
              id: item.id,
              TodoItems: [
                ...item.TodoItems,
                { title: action.payload.title, id: Date.now(), done: false }
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
          if (action.payload.id === item.id) {
            return {
              title: item.title,
              id: item.id,
              TodoItems: item.TodoItems.filter(
                member => member.id !== action.payload.todo_id
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
          if (action.payload.id === item.id) {
            return {
              title: item.title,
              id: item.id,
              TodoItems: item.TodoItems.map(member =>
                member.id === action.payload.todo_id
                  ? { title: member.title, id: member.id, done: !member.done }
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
  deleteTodoListRequest
} = todosFeature.actions;

const reducer = {
  todos: todosFeature.reducer
};

// export const apiFeature = createSlice({
//   name: 'Api',
//   initialState: {
//     loading: false,
//     list: [],
//     errors: [],
//   },
//   reducers: {
//     fetchProjectsRequest: state => {
//       state.loading = true;
//       state.errors = [];
//     },
//     fetchProjectsSuccess: (state, action) => {
//       state.loading = false;
//       state.list = action.payload;
//       state.errors = [];
//     },
//     fetchProjectsFail: (state, action) => {
//       state.loading = false;
//       state.errors.push(action);
//     },
//     postProjects: state => {
//       state.loading = true;
//     },
//     updateProjectsList: (state, action) => {
//       state.list.push(action.payload);
//     },
//   },
// });

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

// function* postProjectsWorker(actions) {
//   try {

//     yield call(
//       axios
//         .post('http://localhost:3000/api/projects', {
//           projectName: actions.payload.name,
//           description: actions.payload.description,
//           projectCreator: 'bla',
//         })
//         .then(data => {
//           console.log('axios', data);

//           updateProjectsList(data.data);
//         })
//         .catch(error => {
//           console.log('err', error);
//         })
//     );
//     yield put(fetchProjectsSuccess(actions.payload));
//   } catch (e) {
//     yield put(fetchProjectsFail(e.message));
//   }
// }

export function* requestTodosWatcher() {
  yield takeEvery(fetchTodosRequest().type, fetchTodosWorker);
  yield takeEvery(postTodoListRequest().type, postTodoListWorker);
  yield takeEvery(deleteTodoListRequest().type, deleteTodoListWorker);
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
