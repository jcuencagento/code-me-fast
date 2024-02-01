import React, { useState } from 'react';

import './App.css';
import Header from './mycomponents/Header';
import Test from './mycomponents/Test';
import Advises from './mycomponents/Advises';
import Footer from './mycomponents/Footer';
import { Toaster } from "./components/ui/sonner"

function App() {
    const [theme, setTheme] = useState('dark');
    return (
        <div className={`App-${theme}`}>
            <Header theme={theme} setTheme={setTheme} />
            <Test theme={theme} />
            <Advises theme={theme} />
            <Footer theme={theme} />
            <Toaster />
        </div>
    );
}

export default App;
