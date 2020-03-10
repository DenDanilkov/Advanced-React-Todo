import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  './todoList.scss'
import classnames from 'classnames' 

import {
  deleteTodoListRequest,
  deleteTodoItemRequest,
  todoItemCompleted,
  postTodoItemRequest,
  updateTodoItemRequest
} from "../store/store";

export default function TodoList(props) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state);
  const title = todos.todoLists.filter(item => item.id === props.id)[0].title
  return (
    <div className='col m3 '>
      <div class="card">
        <span class="card-title">{title}</span>
        <div class="card-content">
          <div className="row valign-wrapper">
            <div className="input-field col s8">
              <input id="todo" type="text" className="validate" onChange={e => { setTodo(e.target.value) }} />
              <label htmlFor="todo">Add your Todo</label>
            </div>
            <div className='row col s4' >
              <button className='btn-floating  btn-small teal'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(postTodoItemRequest([ props.id, {title: todo} ]));
                }}
              > <i class="material-icons">add</i>
              </button>
              <button className='btn-floating btn-small red offset-s7'
                onClick={() => {
                  dispatch(deleteTodoListRequest({ id: props.id }));
                }}

              >
                <i class="material-icons">delete</i>
              </button>

            </div>

          </div>
          <ul className='collection'>
            {todos.todoLists
              .reduce((acc, item) => {
                if (item.id === props.id) {
                  acc.push(...item.TodoItems);
                  return acc;
                } else {
                  return acc;
                }
              }, [])
              .map(item => {
                const liClasses = classnames({
                  'done': item.done,
                  'col': true,
                  's6': true
                });
                return (
                  <li className='collection-item row' key={item.id}>
                    <span className={liClasses}>{item.title}</span>
                    <span className='col s6 row'><button className='btn-floating btn-small red '
                      onClick={() => {
                        dispatch(
                          deleteTodoItemRequest([
                            props.id,
                            item.id
                          ])
                        );
                      }}
                    >
                      <i class="material-icons">delete</i>
                    </button>

                      <span class="switch offset-s1">
                        <label>
                          <input type="checkbox" checked={item.done} onChange={() => {
                            dispatch(
                              updateTodoItemRequest([
                                props.id,
                                item.id,
                              { done: !item.done}
                              ])
                            );
                          }} />
                          <span class="lever"></span>
                        </label>
                      </span></span>
                  </li>
                );
              })}
          </ul>

        </div>
      </div>







    </div>
  );
}
