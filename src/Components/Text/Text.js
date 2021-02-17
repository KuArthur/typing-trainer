import React, {useState,useEffect} from 'react';

import './Text.scss';

import cn from 'classnames';

const Text = ({ text, activeIndex, hasError }) => {
    
    const getLetterClassName = (index) => {
        if (index === activeIndex) {
            return cn('default', hasError ? 'red' : 'yellow');
        } 

        return cn('default', index < activeIndex ? 'green' : 'blue');
    }

    if (!text) return null;

    return (
        <div className = 'Text' >
            {
            text
            .split('')
            .map((letter, i) => <span key={i} className = {getLetterClassName(i)}>{letter}</span>
            )}
            
        </div>
        
    )
}

export default Text;