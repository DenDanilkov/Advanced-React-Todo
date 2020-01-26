import React, { useState } from 'react';
import { connect } from 'react-redux';
import './addTodoList.scss';

function mapStateToProps(state) {
  return {
    todoLists: state.todoLists
  };
}

  function InsertTodoList(props) {
  const [name, setName] = useState('');
  return (
    <div className='todoListInput'>
      <span>Type in a name for your Todo-List:</span>
      <input type="text" placeholder="todo-list name" onChange={(e) => setName(e.target.value)}></input>
    <button >Add!</button>
    </div>
  );
}

export default connect(mapStateToProps)(InsertTodoList);
