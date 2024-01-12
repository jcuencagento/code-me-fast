import React from 'react';

import '../styles/Header.css'
import logo from '../logo.svg';
import github from '../assets/images/github-mark-white.png';
import { Button } from 'semantic-ui-react';

function Header () {
    const github_URL = 'https://github.com/jcuencagento';
    return (
        <header className="App-header">
            <div className="brand">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Code Me Fast </h1>
            </div>
            <Button
                className="button-github"
                animated="fade"
                align="right"
                size="big"
                color="violet"
                onClick={() => {
                    window.open(github_URL, '_blank');
                }}>
                <Button.Content hidden>Login Github</Button.Content>
                <Button.Content visible style={{ height: '90%' }}>
                    <img src={github} className="git-logo" alt="logo" />
                </Button.Content>
            </Button>
        </header>
    )
}

export default Header;