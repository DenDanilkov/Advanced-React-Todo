import React from "react";
import InsertTodoList from "./inputs/addTodoList/addTodoList";
import GenerateTodoLists from './todolists/generateTodolists';
import "./todoLaunch.scss";


function TodoLaunch() {
  const greeting = "Welcome to my Todo-List Application!";
  return (
    <React.Fragment>
      <div className="app">{greeting}</div>
      <InsertTodoList />
      <div className='allTodoLists'>
        <GenerateTodoLists/>     
      </div>
    </React.Fragment>
  );
}

export default TodoLaunch;
