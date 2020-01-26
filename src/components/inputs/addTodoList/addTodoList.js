import React from "react";
import './addTodoList.scss'

export default function InsertTodoList(props) {

  return (
    <div className='todoListInput'>
      <span>Type in a name for your Todo-List:</span>
      <input type="text" placeholder="todo-list name"></input>
      <button>Create!</button>
    </div>
  );
}

// export default AddTodoList;
