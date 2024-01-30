import '../styles/Advises.css'

import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

function Advises () {

    return (
        <div className="advises">
            <div className="advise">
                <DoubleArrowRightIcon className="icon" />
                <p>
                    Click START, press ENTER or type first character to begin typing!  
                </p>
            </div>
            <div className="advise">
                <DoubleArrowRightIcon className="icon" />
                <p>
                    Choose JavaScript, Quotes... and also 60, 30 or 120 seconds, even timeless
                </p>
            </div>
            <div className="advise">
                <DoubleArrowRightIcon className="icon" />
                <p>
                    Strict mode needs every character right, easy don't!
                </p>
            </div>
        </div>
    );
};

export default Advises;
