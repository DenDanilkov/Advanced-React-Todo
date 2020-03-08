import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createTodoList} from '../../store/store'

export default function InsertTodoList(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  return (
    <div className='row'>
      <form className="col s5 offset-s3">
        <div className="row valign-wrapper">
          <div className="input-field col s9">
          <input  id="first_name" type="text" className="validate"   onChange={e => {  setName(e.target.value)}}/>
            <label htmlFor="first_name">Todolist Name</label>
        </div>
        <button className='waves-effect waves-light btn col s2 center-align'
        onClick={(e) => {
          e.preventDefault();
         dispatch(createTodoList({ title: name }));
        }}
        > Add!
        </button>
        </div>
       
      </form>
    </div>
  );
}

