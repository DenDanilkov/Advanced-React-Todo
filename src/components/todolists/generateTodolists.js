import React, { useState } from "react";
import { connect } from "react-redux";
import TodoList from './todoList';

function mapStateToProps(state) {
  return {
    todoLists: state.todoLists
  };
}


function GenerateTodoLists(props) {
  console.log('при генерации тудулиста', props)
  return props.todoLists.map((item, i) => <TodoList id={i + 1} title={item.title} key={item.id} />)
}


export default connect(mapStateToProps)(GenerateTodoLists);