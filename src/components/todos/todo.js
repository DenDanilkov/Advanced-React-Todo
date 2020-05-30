import React from "react";
import classnames from "classnames";

import { useDispatch } from "react-redux";
import { deleteTodoItemRequest, updateTodoItemRequest } from "../store/store";

export const Todo = ({ done, id, title, todolistId }) => {
  const dispatch = useDispatch();
  const liClasses = classnames({
    done,
    col: true,
    s6: true,
  });
  return (
    <li className="collection-item row" key={id}>
      <span className={liClasses}>{title}</span>
      <span className="col s6 row">
        <button
          className="btn-floating btn-small red "
          onClick={() => {
            dispatch(deleteTodoItemRequest([todolistId, id]));
          }}
        >
          <i className="material-icons">delete</i>
        </button>

        <span className="switch offset-s1">
          <label>
            <input
              type="checkbox"
              checked={done}
              onChange={() => {
                dispatch(
                  updateTodoItemRequest([todolistId, id, { done: !done }])
                );
              }}
            />
            <span className="lever"></span>
          </label>
        </span>
      </span>
    </li>
  );
}
