import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    return (
        <div className="container">
            <div className="row">
                <Webcam
                    audio={true}
                    height="100%"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Capture photo</button>
            </div>
        </div>
    );
};
export default WebcamCapture;