import React from 'react';

import './Title.css';

const title = (props) => (
    <div className="Title">
        <p>{props.children}</p>
    </div>
)

export default title;