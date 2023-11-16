import './Container.css'
import React from 'react';

const container = ({children}) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};

export default container;