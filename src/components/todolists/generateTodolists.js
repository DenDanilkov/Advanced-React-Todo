import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TodoList from './todoList';
import {fetchTodosRequest} from '../store/store'

export default function GenerateTodoLists() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTodosRequest())
  }, []);

  const { todos:{todoLists} } = useSelector(state => state);
  return (todoLists.map((item, i) => <TodoList id={item.id} title={item.title} key={item.id} />))
}

