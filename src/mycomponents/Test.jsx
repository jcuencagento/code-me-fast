import React, { useState, useEffect } from 'react';
import '../styles/Test.css'

import { PlayIcon, ResetIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";

function Test () {
    const text = `Lorem ipsum dolor sit amet consectetur adipiscing elit, cras fermentum pharetra at cum nisl nec vivamus, non dictum varius imperdiet elementum curae. 
        Dapibus penatibus commodo cras ultricies nascetur natoque dictum mi potenti, suscipit lobortis sociosqu scelerisque torquent ullamcorper fringilla facilisi. 
        Sagittis fusce netus justo eleifend blandit at hendrerit mattis non turpis, dapibus lobortis cursus ultricies cubilia cras habitasse varius molestie, 
        curabitur porttitor nisl ut pretium sociosqu suscipit nascetur lectus.`;

    const [showFullText, setShowFullText] = useState(false);
    const short_text = text.split(' ').slice(0, 20).join(' '); // Display the first 20 words initially

    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
        let interval_id;
        if (isActive) {
            interval_id = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        clearInterval(interval_id);
                        setIsActive(false);
                    }
                    
                    return prevSeconds > 0 ? prevSeconds - 1 : 0;
                });
            }, 1000);
        }
    
        return () => clearInterval(interval_id);
    }, [isActive]);
  
    const startTimer = () => {
      setIsActive(true);
    };
  
    const resetTimer = () => {
      setIsActive(false);
      setSeconds(60);
    };

    return (
        <div className="container">
            <h1>Timer: {seconds} seconds</h1>
            <div className="sentences">
                <p>
                    {showFullText ? text : short_text}
                </p>
            </div>
            <div className="buttons">
                <Button variant="secondary" onClick={startTimer}>
                    <PlayIcon className="mr-2 h-4 w-4" /> START
                </Button>
                <Button variant="secondary" onClick={resetTimer}>
                    <ResetIcon className="mr-2 h-4 w-4" /> RESET
                </Button>
            </div>
        </div>
    );
}

export default Test;