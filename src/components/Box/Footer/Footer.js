import React from 'react';

import './Footer.css';

const footer = (props) => (
    <div className="Footer">
        <div className="NameFooter">Total</div>
        <div className="ValueFooter">{props.total}</div>
    </div>
)

export default footer;