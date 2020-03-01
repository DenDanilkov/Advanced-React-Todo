export default http => {
  return {
    getAll: () => {
      return http.get('todoLists/');
    },
    createTodoList: (todoList) => {
      return http.post('todoLists/', todoList);
    },
    updateTodoList: (todoListId, update) => {
      return http.put(`todoLists/${todoListId}`, update);
    },
    deleteTodoList: (todoListId) => {
      return http.delete(`todoLists/${todoListId}`);
    },
    createTodoItem: (todoListId, todoItem) => {
      return http.post(`todoLists/${todoListId}/todo`, todoItem);
    },
    updateTodoItem: (todoListId, todoId, update) => {
      return http.put(`todoLists/${todoListId}/todo/${todoId}`, update);
    },
    deleteTodoItem: (todoListId, todoId) => {
      return http.delete(`todoLists/${todoListId}/todo/${todoId}`);
    },
  };
};
