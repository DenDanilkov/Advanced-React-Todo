import React from "react";
import { useSelector } from "react-redux";
import TodoList from './todoList';

export default function GenerateTodoLists() {

  const { todos:{todoLists} } = useSelector(state => state);
  return todoLists.map((item, i) => <TodoList id={item.id} title={item.title} key={item.id} />)
}

