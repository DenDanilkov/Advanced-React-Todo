import React from "react";
import InsertTodoList from "./inputs/addTodoList/addTodoList";
import GenerateTodoLists from './todolists/generateTodolists';
import "./todoLaunch.scss";


function TodoLaunch() {
  const greeting = "Welcome to my Todo-List Application!";
  return (
    <>
      <div className="app">{greeting}</div>
      <InsertTodoList />
      <div className='allTodoLists'>
        <GenerateTodoLists/>     
      </div>
    </>
  );
}

export default TodoLaunch;
