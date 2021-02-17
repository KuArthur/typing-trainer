import React, {useCallback, useEffect,useState} from 'react';

import './App.scss';

import Text from './Components/Text/Text';
import Accuracy from './Components/Accuracy/Accuracy'
import { act } from 'react-dom/test-utils';

const useEventCallback = (fn) => {
  const ref = React.useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return React.useCallback((...args) => ref.current(...args), []);
}

function App() {
  
  const [text,setText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasError, setError] = useState(false);
  const [errors, setErrors] = useState(0)

  useEffect(() => {
    const fetchGetText = async () => {
      const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1')
      const text = await response.json()

      setText(text.join(''));
    }

    fetchGetText()
    
  },[])

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
        setErrors(errors + 1);
        return;
    }
  
    setActiveIndex(newIndex)
  });

  useEffect(() => {
    const onKeypress = e => {
        console.log(e);
        updateIndex(String.fromCharCode(e.charCode));
    }
    document.addEventListener('keypress', onKeypress);

    return () => document.removeEventListener('keypress', onKeypress);
  }, [updateIndex]);

  return (
    <div className = 'App'>
      <div className = 'TypingTrainer'>
        <Text text = {text} activeIndex = {activeIndex} hasError = {hasError} />
      </div>
      <Accuracy text = {text} activeIndex = {activeIndex} errors = {errors} />
      
    </div>
  );
}

export default App;
