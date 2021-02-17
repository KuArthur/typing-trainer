import React, {useState,useEffect} from 'react';

import './Text.scss';

import cn from 'classnames';

const useEventCallback = (fn) => {
    const ref = React.useRef(fn);

    useEffect(() => {
      ref.current = fn;
    }, [fn]);

    return React.useCallback((...args) => ref.current(...args), []);
}

const Text = ({ text }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hasError, setError] = useState(false);

    useEffect(() => {
        setActiveIndex(0);
        setError(false);
    }, [text])

    const updateIndex = useEventCallback((letter) => {
        setError(false);
        const newIndex = activeIndex + 1;

        console.log({newIndex, activeIndex})
        if (newIndex >= text.length) {
            // Все написано
            return;
        }

        const currentLetter = text[activeIndex];

        if (currentLetter !== letter) {
            setError(true);
            return;
        }

        setActiveIndex(newIndex)
    });
 
    useEffect(() => {
        const onKeypress = e => {
            console.log(e);
            updateIndex(String.fromCharCode(e.charCode))
        }
        document.addEventListener('keypress', onKeypress);

        return () => document.removeEventListener('keypress', onKeypress);
    }, [updateIndex]);


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