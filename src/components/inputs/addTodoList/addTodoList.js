import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addTodoList.scss";
import {createTodoList} from '../../store/store'

export default function InsertTodoList(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  return (
    <div className="todoListInput">
      <span>Type in a name for your Todo-List:</span>
      <input
        type="text"
        placeholder="todo-list name"
        onChange={e => setName(e.target.value)}
      ></input>
      <button
        onClick={() => {
         dispatch(createTodoList({ title: name }));
        }}
      >
        Add!
      </button>
    </div>
  );
}

