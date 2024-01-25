import './App.css';
import Header from './mycomponents/Header';
import Test from './mycomponents/Test';
import Advises from './mycomponents/Advises';
import Footer from './mycomponents/Footer';
import { Toaster } from "./components/ui/sonner"

function App() {
    return (
        <div className="App">
            <Header />
            <Test />
            <Advises />
            <Footer />
            <Toaster />
        </div>
    );
}

export default App;
