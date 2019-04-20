import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="flex justify-center">
            <div className="absolute mt2 w-50">
                <img 
                    id="inputImage"
                    src={imageUrl} 
                    alt=""
                    width="100%"
                    height="auto" 
                    className="shadow-3 br3"
                />
                <div className="FaceBoundingBox" style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
            </div>
        </div>
    )
}
export default FaceRecognition;