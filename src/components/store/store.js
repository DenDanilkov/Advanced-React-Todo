import { createStore } from 'redux';

const initialState = {
    todoLists: []
  };

function reducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case 'CREATE_TODO-LIST':
          return {
            todoLists: [...state.todoLists, {title: action.title, id: (state.todoLists.length + 1), todos: []}]
          };
        case 'DELETE_TODO-LIST':
          return {
            count: state.count - 1
          };
        case 'RESET':
          return {
            count: 0
          };
        default:
          return state;
      }
  }

   const store = createStore(reducer);
   export default store;

