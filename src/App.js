import {React,useEffect,useState} from 'react';

import './App.scss';

import Text from './Components/Text/Text';

function App() {
  
  const [text,setText] = useState('');

  useEffect(() => {
    const fetchGetText = async () => {
      const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1')
      const text = await response.json()

      setText(text.join(''));
    }

    fetchGetText()
    
  },[])

  return (
    <div className = 'App'>
      <div className = 'TypingTrainer'>
        <Text text = {text}/>
      </div>
      
    </div>
  );
}

export default App;
