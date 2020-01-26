import React from "react";
import InsertTodoList from "./inputs/addTodoList/addTodoList";
import "./todoLaunch.scss";

function TodoLaunch() {
  const greeting = "Welcome to my Todo-List Application!";
  return (
    <React.Fragment>
      <div className="app">{greeting}</div>
      <InsertTodoList />
    </React.Fragment>
  );
}

export default TodoLaunch;
