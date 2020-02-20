import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./todoList.scss";
import { deleteTodoList, addTodoItem, deleteTodoItem, todoItemCompleted } from '../store/store'

export default function TodoList(props) {

  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state);

  return (
    <div className="TodoList">
      <span>{todos.title}</span>
      <input
        onChange={e => {
          setTodo(e.target.value);
        }}
        placeholder="Add your Todo"
        type="text"
      ></input>
      <button
        onClick={() => {
          dispatch(addTodoItem({ id: props.id, title: todo }));
        }}
      >
        Add Todo
      </button>
      <button
        onClick={() => {
          dispatch(deleteTodoList({ id: props.id }));
        }}
      >
        Delete
      </button>
      <ul className="tasks">
        {todos.todoLists.reduce((acc, item) => {
          if (item.id === props.id) {
            acc.push(...item.todos)
            return acc;
          }
          else { return acc }
        }, []).map(item => {
          return <li key={item.id}>
            {item.title}
            <button
              onClick={() => {
                dispatch(deleteTodoItem({
                  id: props.id,
                  todo_id: item.id
                }));
              }}
              className="delete"
            >delete todoItem</button>
            <button
              onClick={() => {
                dispatch(todoItemCompleted({
                  id: props.id,
                  todo_id: item.id
                }));
              }}
              className="checked"
            >checked</button>
          </li>;
        })}
      </ul>
    </div>
  );
}

