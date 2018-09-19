import React from 'react';

import './FloatButton.css';

const floatButton = (props) => (
    <div onClick={props.clicked}  className="float">
        <i className="my-float">+</i>
    </div>
)

export default floatButton;