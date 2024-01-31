import React from 'react';

import '../styles/Header.css'
import Theme from './Theme';
import logo from '../logo.svg';

import { AvatarIcon } from "@radix-ui/react-icons"

function Header () {
    return (
        <header className="App-header">
            <div className="brand">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Code Me Fast </h1>
            </div>
            <div className="leaderboard">
                <AvatarIcon className="mr-2 h-6 w-6" />
                <p>Leaderboard and registering coming soon...</p>
            </div>
            {/* <Button className="button-github" variant="ghost" onClick={() => { window.open(github_URL, '_blank') }}>
                <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login GitHub
            </Button> */}
            <div className="theme">
                <Theme />
            </div>
        </header>
    )
}

export default Header;