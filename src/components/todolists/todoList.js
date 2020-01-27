import React, { useState } from "react";
import { connect } from "react-redux";
import "./todoList.scss";

function mapStateToProps(state) {
  return {
    todoLists: state.todoLists
  };
}

function TodoList(props) {
  
  const [todo, setTodo] = useState("");

  return (
    <div className="TodoList">
      <span>{props.title}</span>
      <input
        onChange={e => {
          setTodo(e.target.value);
        }}
        placeholder="Add your Todo"
        type="text"
      ></input>
      <button
        onClick={() => {
          props.dispatch({ type: "ADD_TODO", id: props.id, title: todo });
        }}
      >
        Add Todo
      </button>
      <button
        onClick={() => {
          props.dispatch({ type: "DELETE_TODO-LIST", id: props.id });
        }}
      >
        Delete
      </button>
      <ul className="tasks">
        {props.todoLists.reduce((acc,item) => {
         if (item.id === props.id) {
          acc.push(...item.todos)
          return acc;
        }
         else {return acc}
        },[]).map(item => { return <li key={item.id}>
          {item.title}
          <button
            onClick={() => {
              props.dispatch({
                type: "DELETE_TODO",
                id: props.id,
                todo_id: item.id
              });
            }}
            className="delete"
          ></button>
          <button
            onClick={() => {
              props.dispatch({
                type: "DONE_TODO",
                id: props.id,
                todo_id: item.id
              });
            }}
            className="checked"
          ></button>
        </li>;
        })}
      </ul>
    </div>
  );
}

export default connect(mapStateToProps)(TodoList);
