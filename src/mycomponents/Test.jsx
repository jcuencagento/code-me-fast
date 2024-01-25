import React, { useState, useEffect } from 'react';
import '../styles/Test.css'

import { PlayIcon, ResetIcon, ClockIcon, RocketIcon, KeyboardIcon } from "@radix-ui/react-icons";
 
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
  

function Test () {
    /*const text_code = `function helloWorld(name) {\n
        console.log('Hello world, I am', name);\n
    };`;*/

    const text = `Lorem ipsu{ [m dolor sit am;et conse,ctetur adipiscing elit et, purus quam felis suspendisse sed mus taciti fringilla, elementum rutrum tincidunt montes dictumst facilisi enim. Est tincidunt magna ut non diam aliquet ante fermentum fames mus luctus nullam, ornare porttitor nec sem habitasse feugiat duis interdum mollis nisi facilisi. Facilisi tempor a sociosqu purus odio condimentum in nascetur, rutrum suspendisse porttitor cum ante venenatis commodo torquent eu, felis nam enim.`;

    const [gameType, setGameType] = useState('Strict mode');
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [lastCorrect, setLastCorrect] = useState(true);
    const [wpm, setWPM] = useState(0);
  
    /* Key press */
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === ' ') {
                event.preventDefault();
            }

            if (isActive) {
                if (gameType === 'Strict mode') {
                    const currentChar = text[currentIndex];
                    switch (event.key) {
                        case currentChar:
                            setCorrectChars((prevCorrectChars) => prevCorrectChars + 1);
                            setCurrentIndex((currentIndex) => currentIndex + 1);
                            break;

                        case 'Backspace':
                            if (currentIndex > 0) {
                                setIncorrectChars((prevIncorrectChars) => (prevIncorrectChars > 0 ? prevIncorrectChars - 1 : 0));
                            }
                            break;

                        default:
                            const alphanumeric = /^[a-zA-Z0-9\s.\n{}[\]]$/;
                            if (alphanumeric.test(event.key)) {
                                setIncorrectChars((prevIncorrectChars) => prevIncorrectChars + 1);
                            }
                            break;
                    }
                } else {
                    const currentChar = text[currentIndex];
                    switch (event.key) {
                        case currentChar:
                            setCorrectChars((prevCorrectChars) => prevCorrectChars + 1);
                            setCurrentIndex((currentIndex) => currentIndex + 1);
                            setLastCorrect(true);
                            break;

                        default:
                            const alphanumeric = /^[a-zA-Z0-9\s.\n{}[\]]$/;
                            if (alphanumeric.test(event.key)) {
                                setCurrentIndex((currentIndex) => currentIndex + 1);
                                setLastCorrect(false);
                            }
                            break;
                    }
                }
            }

            if (!isActive && (event.key === text[0] || event.key === 'Enter')) {
                setIsActive(true);
                if (event.key === text[0]) {
                    setCorrectChars((prevCorrectChars) => prevCorrectChars + 1);
                    setCurrentIndex((currentIndex) => currentIndex + 1);
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isActive, currentIndex, text, gameType]);

    const getHighlightedTextStrict = (currentIndex) => {
        const correctText = text.slice(0, currentIndex);
        const currentChar = text[currentIndex + incorrectChars];
        const incorrectText = text.slice(currentIndex + (currentIndex > 0 ? 0 : incorrectChars), currentIndex + incorrectChars);
        const remainingText = text.slice(currentIndex + 1 + incorrectChars);

        return (
            <>
                <span style={{ color: 'green' }}>{correctText}</span>
                <span style={{ borderRadius: '0.5vh', backgroundColor: 'red' }}>{incorrectText}</span>
                <span style={{ borderRadius: '0.5vh', backgroundColor: 'grey' }}>{currentChar}</span>
                {remainingText}
            </>
        );
    };

    const getHighlightedTextEasy = (currentIndex) => {
        const oldText = text.slice(0, currentIndex > 1 ? currentIndex - 1 : 0);
        const prevChar = text[currentIndex - 1];
        const currentChar = text[currentIndex];
        const remainingText = text.slice(currentIndex + 1 + incorrectChars);

        return (
            <>
                <span style={{ opacity: '0.6' }}>{oldText}</span>
                <span style={lastCorrect ? { color: 'green' } : { color: 'red'}}>
                    {prevChar}
                </span>
                <span style={{ borderRadius: '0.5vh', backgroundColor: 'grey' }}>{currentChar}</span>
                {remainingText}
            </>
        );
    };

    /* Timer */
    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        clearInterval(intervalId);
                        setIsActive(false);
                    }

                    return prevSeconds > 0 ? prevSeconds - 1 : 0;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isActive]);

    /* WPM */
    useEffect(() => {
        const calculateWPM = () => {
            const newWPM = ((correctChars / 5) / ((60.01 - seconds) / 60)).toFixed(1);
            setWPM(newWPM);
        };

        if (seconds % 2 === 0 && seconds !== 60) {
            calculateWPM();
        }
    }, [correctChars, seconds]);
  
    const startAgainTimer = () => {
        setSeconds(60);
        setIsActive(true);
        setCurrentIndex(0);
        setCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };
    
    const startTimer = () => {
        setIsActive(true);
        setCurrentIndex(0);
        setCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };
  
    const resetTimer = () => {
        setIsActive(false);
        setSeconds(60);
        setCurrentIndex(0);
        setCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };

    const handleGameType = (value) => {
        setGameType(value);
        setIsActive(false);
        setSeconds(60);
        setCurrentIndex(0);
        setCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    }

    return (
        <div className="container">
            <div className="counters">
                {(seconds !== 0 && !isActive)
                    ? <Badge variant="secondary" className="text-xl">
                        <ClockIcon className="mr-2 h-8 w-8" /> {seconds}
                    </Badge>
                    : <Badge variant="destructive" className="text-xl">
                        <ClockIcon className="mr-2 h-8 w-8" /> {seconds}
                    </Badge>
                }
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="game">{gameType}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72">
                        <DropdownMenuLabel>Game difficulty</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={gameType} onValueChange={(value) => handleGameType(value)}>
                            <DropdownMenuRadioItem value="Strict mode">Strict mode</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Easy mode">Easy mode</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Badge variant={wpm > 0 ? wpm > 40 ? "great" : "improve" : "secondary"} className="text-xl">
                    <KeyboardIcon className="mr-2 h-8 w-8" /> {wpm} WPM
                </Badge>
            </div>
            <div className="sentences">
                <p>
                    {gameType === 'Strict mode' ? getHighlightedTextStrict(currentIndex) : getHighlightedTextEasy(currentIndex)}
                </p>
            </div>
            <div className="buttons">
                {seconds === 0 
                    ? <Button variant="secondary" onClick={startAgainTimer}>
                        <PlayIcon className="mr-2 h-5 w-5" /> START AGAIN
                    </Button>
                    : !isActive
                    ? <Button variant="secondary" onClick={startTimer}>
                        <PlayIcon className="mr-2 h-5 w-5" /> START
                    </Button>
                    : null
                }
                <Button variant="secondary" onClick={resetTimer}>
                    <ResetIcon className="mr-2 h-5 w-5" /> RESET
                </Button>
            </div>
            {seconds === 0 
                ? <div className="finish">
                    <Alert variant={wpm > 40 ? "great" : "improve"}>
                        <RocketIcon className="h-8 w-8" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            Your score was {wpm} WPM... {wpm > 40 ? "Incredible work!" : "Keep working!"}
                        </AlertDescription>
                    </Alert>
                </div>
                : null
            }
        </div>
    );
}

export default Test;