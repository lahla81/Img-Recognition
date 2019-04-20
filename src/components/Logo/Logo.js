import React from 'react';
import Tilt from "react-tilt";
import './logo.css';
import brain from './icons8-brain-64.png';
const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt br3 ma3 shadow-3" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt="brain logo" width="76%" style={{marginTop: '12%'}} />
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;