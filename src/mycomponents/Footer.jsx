import React from 'react';

import '../styles/Footer.css'
import Contact from './Contact';
import Terms from './Terms';

import { GitHubLogoIcon, LinkedInLogoIcon, CodeIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";


function Footer ({ theme }) {
    const github_URL = 'https://github.com/jcuencagento';
    const linkedin_URL = 'https://www.linkedin.com/in/javiercuencagento/';
    const code_URL = 'https://github.com/jcuencagento/code-me-fast';
    const color_name = theme === 'dark'
        ? 'white' : theme === 'light' ? '#282c34' : 'rgb(71, 42, 9)'
    return (
        <footer className={`App-footer-${theme}`}>
            <div className="contacts-left">
                <Contact />
                <Terms />
                <Button variant="ghost" onClick={() => { window.open(code_URL, '_blank') }}>
                    <CodeIcon className="mr-2 h-4 w-4" /> Code  
                </Button>
            </div>
            <p style={{ color: color_name, fontSize: '0.7em', fontWeight: '700' }}> Made with 🧠 by Javier Cuenca Gento </p>
            <div className="links-right">
                <Button variant="ghost" onClick={() => { window.open(linkedin_URL, '_blank') }}>
                    <LinkedInLogoIcon className="mr-2 h-4 w-4" /> Linkedin  
                </Button>
                <Button variant="ghost" onClick={() => { window.open(github_URL, '_blank') }}>
                    <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub  
                </Button>
            </div>
        </footer>
    )
}

export default Footer;