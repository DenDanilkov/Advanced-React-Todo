import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import store from './components/store/store.js';
import TodoLaunch from "./components/todoLaunch.js";

// import './components/store/store'
ReactDOM.render(
  <Provider store={store}>
    <TodoLaunch />
  </Provider>,
  document.getElementById("wrapper")
);
