import React from 'react';

import './Container.css';

const container = (props) => (
    <div className="Container">
        <div className="ContainerName">{props.name}</div>
        <div className="ContainerDate">{props.date}</div>
        <div className="ContainerValue">{props.value}</div>
    </div>
)

export default container;