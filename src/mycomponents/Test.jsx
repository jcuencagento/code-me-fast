import React, { useState, useEffect } from 'react';
import '../styles/Test.css'

import { PlayIcon, ResetIcon, ClockIcon, RocketIcon, KeyboardIcon, StopIcon, StarFilledIcon } from "@radix-ui/react-icons";
 
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
import { toast } from "sonner"

import texts from '../assets/texts.json'

function Test () {
    /* Use States */
    const [gameType, setGameType] = useState('Strict mode');
    const [gameDuration, setGameDuration] = useState(60);
    const [gameTextType, setGameTextType] = useState('JavaScript');
    const [gameText, setGameText] = useState(texts[gameTextType][Math.floor(Math.random() * 60)]);
    const [nextGameText, setNextGameText] = useState(texts[gameTextType][Math.floor(Math.random() * 60)]);
    const [seconds, setSeconds] = useState(gameDuration);
    const [isActive, setIsActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalCorrectChars, setTotalCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [lastCorrect, setLastCorrect] = useState(true);
    const [wpm, setWPM] = useState(0);
  
    /* Test logic */
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === ' ') {
                event.preventDefault();
            }

            if (isActive) {
                if (gameType === 'Strict mode') {
                    const currentChar = gameText[currentIndex];
                    switch (event.key) {
                        case currentChar:
                            setTotalCorrectChars((prevTotalCorrectChars) => prevTotalCorrectChars + 1);
                            setCurrentIndex((currentIndex) => currentIndex + 1);
                            if (currentIndex === gameText.length - 1) {
                                setGameText(nextGameText);
                                setNextGameText(texts[gameTextType][Math.floor(Math.random() * 60)])
                                setCurrentIndex(0);
                                setIncorrectChars(0);
                                toast('Finished!');
                            }

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
                    const currentChar = gameText[currentIndex];
                    switch (event.key) {
                        case currentChar:
                            setTotalCorrectChars((prevTotalCorrectChars) => prevTotalCorrectChars + 1);
                            setCurrentIndex((currentIndex) => currentIndex + 1);
                            setLastCorrect(true);
                            if (currentIndex === gameText.length - 1) {
                                setGameText(nextGameText);
                                setNextGameText(texts[gameTextType][Math.floor(Math.random() * 60)])
                                setCurrentIndex(0);
                                setIncorrectChars(0);
                            }
 
                        break;

                        default:
                            const alphanumeric = /^[a-zA-Z0-9\s.\n%{}\-[\]]$/;
                            if (alphanumeric.test(event.key)) {
                                setCurrentIndex((currentIndex) => currentIndex + 1);
                                setLastCorrect(false);
                            }

                        break;
                    }
                }
            }

            if (!isActive && (event.key === gameText[0] || event.key === 'Enter')) {
                setIsActive(true);
                if (event.key === gameText[0]) {
                    setTotalCorrectChars((prevCorrectChars) => prevCorrectChars + 1);
                    setCurrentIndex((currentIndex) => currentIndex + 1);
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isActive, currentIndex, gameText, gameType, gameTextType, nextGameText]);

    /* Texts formatting */
    const getHighlightedTextStrict = (currentIndex) => {
        const correctText = gameText.slice(0, currentIndex);
        const currentChar = gameText[currentIndex + incorrectChars];
        const incorrectText = gameText.slice(currentIndex + (currentIndex > 0 ? 0 : incorrectChars), currentIndex + incorrectChars);
        const remainingText = gameText.slice(currentIndex + 1 + incorrectChars);

        return (
            <>
                <span style={{ color: 'green' }}>{correctText}</span>
                <span style={{ borderRadius: '0.5vh', backgroundColor: 'red' }}>{incorrectText}</span>
                <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre-wrap' }}>
                <span style={{ display: 'inline-block'}}>{currentChar}</span>
                <span style={{
                        position: 'absolute',
                        left: '-1px',
                        height: '100%',
                        width: '0.4vh',
                        background: 'dodgerblue',
                        animation: 'blinking 1s infinite'
                    }}/>
                </span>
                {remainingText}
                <br />
                <span style={{ opacity: '0.7' }}>{nextGameText}</span>
            </>
        );
    };

    const getHighlightedTextEasy = (currentIndex) => {
        const oldText = gameText.slice(0, currentIndex > 1 ? currentIndex - 1 : 0);
        const prevChar = gameText[currentIndex - 1];
        const currentChar = gameText[currentIndex];
        const remainingText = gameText.slice(currentIndex + 1 + incorrectChars);

        return (
            <>
                <span style={{ opacity: '0.6' }}>{oldText}</span>
                <span style={lastCorrect ? { color: 'green' } : { color: 'red'}}>
                    {prevChar}
                </span>
                <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre-wrap' }}>
                <span style={{ display: 'inline-block'}}>{currentChar}</span>
                <span style={{
                        position: 'absolute',
                        left: '-1px',
                        height: '100%',
                        width: '0.4vh',
                        background: 'dodgerblue',
                        animation: 'blinking 1s infinite'
                    }}/>
                </span>
                {remainingText}
                <br />
                <span style={{ opacity: '0.7' }}>{nextGameText}</span>
            </>
        );
    };

    /* Timer */
    useEffect(() => {
        let intervalId;
        if (isActive && gameDuration !== 'Inf') {
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
    }, [isActive, gameDuration]);

    /* WPM */
    useEffect(() => {
        const calculateWPM = () => {
            if (gameDuration !== 'Inf') {
                const timing = Number(gameDuration) - seconds + 0.01;
                const newWPM = ((totalCorrectChars / 5) / (timing / 60)).toFixed(1);
                setWPM(newWPM < 1000 ? newWPM : 0.0);
            } else {
                setWPM(totalCorrectChars);
            }
        };

        calculateWPM();
    }, [totalCorrectChars, seconds, gameDuration]);

    /* Buttons handlers */
    const startAgainTimer = () => {
        setSeconds(gameDuration);
        setIsActive(true);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };
    
    const startTimer = () => {
        setIsActive(true);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };

    const stopTimer = () => {
        setIsActive(false);
        setSeconds(0);
    };
  
    const resetTimer = () => {
        setIsActive(false);
        setGameText(texts[gameTextType][Math.floor(Math.random() * 60)]);
        setNextGameText(texts[gameTextType][Math.floor(Math.random() * 60)]);
        setSeconds(gameDuration);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };

    const handleGameType = (value) => {
        setGameType(value);
        setIsActive(false);
        setSeconds(gameDuration);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };

    const handleGameDuration = (value) => {
        setGameDuration(value);
        setIsActive(false);
        setSeconds(value);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };

    const handleGameTextType = (value) => {
        setGameTextType(value);
        setGameText(texts[value][Math.floor(Math.random() * 60)]);
        setNextGameText(texts[value][Math.floor(Math.random() * 60)]);
        setIsActive(false);
        setSeconds(gameDuration);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setWPM(0);
    };

    return (
        <div className="container">
            <div className="counters">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={seconds !== 0 && !isActive ? "secondary" : "destructive"} className="text-xl">
                            <ClockIcon className="mr-2 h-8 w-8" /> {seconds}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72">
                        <DropdownMenuLabel>Choose duration</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={gameDuration} onValueChange={(value) => handleGameDuration(value)}>
                            <DropdownMenuRadioItem value="60">60 seconds</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="30">30 seconds</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="120">2 minutes</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Inf">No time</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="game">{gameTextType === 'randomTexts' ? 'Random text' : gameTextType}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72">
                        <DropdownMenuLabel>Game type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={gameTextType} onValueChange={(value) => handleGameTextType(value)}>
                            <DropdownMenuRadioItem value="JavaScript">JavaScript</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Python">Python</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Quotes">Quotes</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="randomTexts">Random text</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                {gameDuration !== 'Inf' 
                    ? (
                        <HoverCard asChild>
                            <HoverCardTrigger asChild>
                                <Button variant={wpm > 0 ? wpm > 40 ? "great" : "improve" : "wpm"} className="text-xl">
                                    <KeyboardIcon className="mr-2 h-8 w-8" /> {wpm} WPM
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-around">
                                    <StarFilledIcon className="h-6 w-6 opacity-70" />
                                    <h4 className="text-base font-bold">Words per minute</h4>
                                </div>
                                <div className="flex-col mt-2">
                                    <p className="text-sm">🟠 <strong>You can improve</strong> → 0 to 25</p>
                                    <p className="text-sm">🟢 <strong>Really good work</strong> → 25 to 50</p>
                                    <p className="text-sm">🔵 <strong>Amazing typing</strong> → 50 or more</p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ) : (
                        <HoverCard asChild>
                            <HoverCardTrigger asChild>
                                <Button variant={wpm > 0 ? "great" : "wpm"} className="text-xl">
                                    <KeyboardIcon className="mr-2 h-8 w-8" /> {wpm} Chars
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-around space-x-2">
                                    <StarFilledIcon className="h-4 w-4 opacity-70" />
                                    <h4 className="text-base font-bold">Total characters</h4>
                                    </div>
                                <div className="flex-col mt-2">
                                    <p className="text-sm">When typing with no time,</p>
                                    <p className="text-sm">you will see number of correct chars...</p>
                                    <p className="text-sm font-semibold">For WPM, play 30, 60 or 120 seconds!</p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )}
            </div>
            <div className="sentences">
                <p>
                    {gameType === 'Strict mode' ? getHighlightedTextStrict(currentIndex) : getHighlightedTextEasy(currentIndex)}
                </p>
            </div>
            <div className="buttons">
                {seconds === 0 || currentIndex === gameText.length
                    ? <Button variant="secondary" onClick={startAgainTimer}>
                        <PlayIcon className="mr-2 h-5 w-5" /> START AGAIN
                    </Button>
                    : !isActive
                    ? <Button variant="secondary" onClick={startTimer}>
                        <PlayIcon className="mr-2 h-5 w-5" /> START
                    </Button>
                    : gameDuration === 'Inf'
                    ? <Button variant="secondary" onClick={stopTimer}>
                        <StopIcon className="mr-2 h-5 w-5" /> STOP
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
                        {gameDuration !== 'Inf'
                            ? (
                                <AlertDescription>
                                    Your score was {wpm} WPM... {wpm > 40 ? "Incredible work!" : "Keep working!"}
                                </AlertDescription>
                            ) : (
                                <AlertDescription>
                                    Your score was {wpm} total correct characters!
                                </AlertDescription>
                            )}
                    </Alert>
                </div>
                : null
            }
        </div>
    );
}

export default Test;