import React from 'react';

import './Accuracy.scss';

const Accuracy = ({accuracy}) => {
    return (
        <div className = 'Accuracy'>
            <span>Точность</span>
            <span>{accuracy}</span>
        </div>
    )
}