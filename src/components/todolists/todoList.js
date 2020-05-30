import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./todoList.scss";
import {
  deleteTodoListRequest,
  postTodoItemRequest,
} from "../store/store";
import { Todo } from "../todos/todo";

export default function TodoList(props) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state);
  const title = todos.todoLists.filter((item) => item.id === props.id)[0].title;
  return (
    <div className="col m3 ">
      <div class="card medium">
      <div class="card-content">
      <span class="card-title">{title}</span>
          <div className="row valign-wrapper">
            <div className="input-field col s8">
              <input
                id="todo"
                type="text"
                className="validate"
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              />
              <label htmlFor="todo">Add your Todo</label>
            </div>
            <div className="row col s4">
              <button
                className="btn-floating  btn-small teal"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(postTodoItemRequest([props.id, { title: todo }]));
                }}
              >
                <i class="material-icons">add</i>
              </button>
              <button
                className="btn-floating btn-small red offset-s7"
                onClick={() => {
                  dispatch(deleteTodoListRequest({ id: props.id }));
                }}
              >
                <i class="material-icons">delete</i>
              </button>
            </div>
          </div>
          <ul className="collection">
            {todos.todoLists
              .reduce((acc, item) => {
                if (item.id === props.id) {
                  acc.push(...item.TodoItems);
                  return acc;
                } else {
                  return acc;
                }
              }, [])
              .map(({ done, id, title }) => (
                <Todo
                  done={done}
                  id={id}
                  title={title}
                  todolistId={props.id}
                  key={id}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
