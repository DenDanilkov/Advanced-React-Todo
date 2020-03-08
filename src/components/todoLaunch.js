import React from "react";
import InsertTodoList from "./inputs/addTodoList/addTodoList";
import GenerateTodoLists from './todolists/generateTodolists';



function TodoLaunch() {
  const greeting = "Welcome to my Todo-List Application!";
  return (
    <>
      <div className='row'> <h4 className='col m6 offset-m3'>{greeting}</h4></div>
      <InsertTodoList />
      <div className='row'>
        <GenerateTodoLists/>     
      </div>
    </>
  );
}

export default TodoLaunch;
