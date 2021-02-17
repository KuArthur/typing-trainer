import {React, useState,useEffect,useCallback,useRef} from 'react';

import './Accuracy.scss';

const Accuracy = ({text, activeIndex, errors}) => {
    const [accuracy,setAccurancy] = useState(100);
    
    useEffect(() => {
        if(errors) {
            let newAccurancy = Math.floor((text.split('').length - errors) / (text.split('').length * 0.01) * 100) / 100;
            setAccurancy(newAccurancy);
        }
          
      },[activeIndex])

    return (
        <div className = 'Accuracy'>
            <span>Точность</span>
            <span>{accuracy} %</span>
        </div>
    )
}

export default Accuracy;