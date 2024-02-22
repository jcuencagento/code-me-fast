import React from 'react';

import '../styles/Header.css'
import Theme from './Theme';
import logo from '../logo.svg';

import { AvatarIcon } from "@radix-ui/react-icons"

function Header ({ theme, setTheme }) {
    return (
        <header className={`App-header-${theme}`}>
            <div className={`brand-${theme}`}>
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Code Me Fast </h1>
            </div>
            <div className={`leaderboard-${theme}`}>
                <a href='https://donkey-code.vercel.app' rel="noreferrer" target="_blank" className={`leaderboard-${theme}`}>
                    <AvatarIcon className="mr-2 h-6 w-6" />
                    <p>Login, leaderboard and more in new web project!</p>
                </a>
            </div>
            {/* <Button className="button-github" variant="ghost" onClick={() => { window.open(github_URL, '_blank') }}>
                <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login GitHub
            </Button> */}
            <div className="theme">
                <Theme setTheme={setTheme} />
            </div>
        </header>
    )
}

export default Header;