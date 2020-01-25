import React from 'react';
import '../styles/todos/todos.scss'

function TodoLaunch(props) {

    const greeting = 'Hello in my Todo Application!';

    return <div className='app'>{greeting}</div>;
}

export default TodoLaunch;