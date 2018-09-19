import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Auxiliar/Auxiliar';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main>
            {props.children}
        </main>    
    </Aux>
)

export default layout;