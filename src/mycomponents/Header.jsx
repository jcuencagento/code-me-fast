import React from 'react';

import '../styles/Header.css'
import logo from '../logo.svg';
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Button } from "../components/ui/button";

function Header () {
    const github_URL = 'https://github.com/jcuencagento';
    return (
        <header className="App-header">
            <div className="brand">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Code Me Fast </h1>
            </div>
            <Button className="button-github" variant="ghost" onClick={() => { window.open(github_URL, '_blank') }}>
                <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login GitHub
            </Button>
        </header>
    )
}

export default Header;