import React from 'react';

import '../styles/Footer.css'
import logo from '../logo.svg';
import github from '../assets/images/github-mark-white.png';

function Footer () {
    const github_URL = 'https://github.com/jcuencagento';
    const linkedin_URL = 'https://www.linkedin.com/in/javiercuencagento/';
    const code_URL = 'https://github.com/jcuencagento/code-me-fast';
    return (
        <footer className="App-footer">
            <div className="contacts-left">
                <div className="footer-button">
                    <a href={code_URL} target="_blank" rel="noopener noreferrer">
                        <img src={github} className="git-logo" alt="logo" />
                    </a>
                    <a href={code_URL} target="_blank" rel="noopener noreferrer">
                        <p>Contact</p>
                    </a>
                </div>
                <div className="footer-button">
                    <a href={code_URL} target="_blank" rel="noopener noreferrer">
                        <img src={github} className="git-logo" alt="logo" />
                    </a>
                    <a href={code_URL} target="_blank" rel="noopener noreferrer">
                        <p>Terms</p>
                    </a>
                </div>
                <div className="footer-button">
                    <a href={code_URL} target="_blank" rel="noopener noreferrer">
                        <img src={github} className="git-logo" alt="logo" />
                    </a>
                    <a href={code_URL} target="_blank" rel="noopener noreferrer">
                        <p>Code</p>
                    </a>
                </div>
            </div>
            <div className="jcuencagento">
                <img src={logo} alt="logo" />
                <p> Made with 🧠 by Javier Cuenca Gento </p>
            </div>
            <div className="links-right">
                <div className="footer-button">
                    <a href={linkedin_URL} target="_blank" rel="noopener noreferrer">
                        <img src={github} className="git-logo" alt="logo" />
                    </a>
                    <a href={linkedin_URL} target="_blank" rel="noopener noreferrer">
                        <p>LinkedIn</p>
                    </a>
                </div>
                <div className="footer-button">
                    <a href={github_URL} target="_blank" rel="noopener noreferrer">
                        <img src={github} className="git-logo" alt="git-logo" />
                    </a>
                    <a href={github_URL} target="_blank" rel="noopener noreferrer">
                        <p>GitHub</p>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;