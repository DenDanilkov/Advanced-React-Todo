import { createStore } from "redux";

const initialState = {
  todoLists: []
};

function reducer(state = initialState, action) {
  console.log("reducer", state, action);
  switch (action.type) {
    case "CREATE_TODO-LIST":
      return {
        todoLists: [
          ...state.todoLists,
          { title: action.title, id: state.todoLists.length + 1, todos: [] }
        ]
      };
    case "DELETE_TODO-LIST":
      return {
        todoLists: state.todoLists.filter(item => {
          item.id !== action.id;
        })
      };
    case "ADD_TODO":
      return {
        todoLists: state.todoLists.map((item, i) => {
          console.log('Заходит ли сюда?')
          if (action.id - 1 === i) {
            item.todos.push({
              title: action.title,
              id: item.todos.length,
              done: false
            });
          } else {
            return item;
          }
        })
      };
    case "DELETE_TODO":
      return {
        todoLists: state.todoLists.map((item, i) => {
          if (action.id - 1 === i) {
            return ({
              title: item.title,
              id: item.id,
              todos: item.todos.filter((member, i) => i !== action.todo_id - 1)
            });
          } else {
            return item;
          }
        })
      };
    case "DONE_TODO":
      return {
        todoLists: state.todoLists.map(item, i => {
          if (action.id - 1 === i) {
            return ({
              title: item.title,
              id: item.id,
              todos: item.todos.map((member, i) => i === action.todo_id - 1 ? { title: member.title, id: member.id, done: !member.done } : member)
            });
          } else {
            return item;
          }
        })
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
