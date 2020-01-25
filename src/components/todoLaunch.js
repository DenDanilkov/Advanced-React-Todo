import React from 'react';
import './todoLaunch.scss'

function TodoLaunch(props) {

    const greeting = 'Hello in my Todo Application!';
    return <div className='app'>{greeting}</div>;
}

export default TodoLaunch;