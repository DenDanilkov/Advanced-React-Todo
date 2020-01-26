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
            todoLists: state.todoLists.filter(item => {item.id !== action.id})
          };
        case 'ADD_TODO':
          return {
            todoLists:  todoLists.map(item, i => {
                if ((action.id - 1) === i) {return item.todos.concat({title: action.title, id: item.todos + 1, done: false})}
                else {return item} 
            })  
          };
        default:
          return state;
      }
  }

   const store = createStore(reducer);
   export default store;

