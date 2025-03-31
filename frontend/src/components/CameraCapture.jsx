import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { FiCamera, FiVideo, FiX } from "react-icons/fi";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedText, setScannedText] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);

  // Start Camera
  const startCamera = async () => {
    try {
      setIsProcessing(true);
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices.length === 0) {
        console.error("❌ No cameras found!");
        alert("No cameras found. Please connect a camera and reload.");
        return;
      }

      // Select the first available camera
      const selectedDeviceId = videoDevices[0].deviceId;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDeviceId },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
        console.log("📷 Camera started successfully!");
      }
      setIsProcessing(false);
    } catch (error) {
      console.error("❌ Camera Error:", error);
      alert("Camera access denied. Please allow camera permissions.");
    }
  };

  // Capture Image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      // Set canvas size same as video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to image URL
      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      processOCR(imageUrl); // Ensure OCR runs
    }
  };

  // Process OCR (Extract Text)
  const processOCR = async (image) => {
    const { data: { text } } = await Tesseract.recognize(image, "eng");
    setScannedText(text);
    console.log("Extracted Text:", text);
  };

    // Reset scanner
  const resetScanner = () => {
    stopCamera();
    setImage(null);
    setScannedText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ingredient Scanner</h2>
 
      {/* Camera Preview 
       <div className="relative bg-black rounded-xl overflow-hidden mb-4 flex-1 flex items-center justify-center">
        {!isCameraOn ? (
          <div className="text-center p-6 text-gray-400">
            <FiVideo className="mx-auto text-4xl mb-2" />
            <p>Camera is off</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            
            className="w-full h-full object-contain"
          />
        )}
      </div> */}

      {/* Video Display */}
      <video ref={videoRef} autoPlay playsInline className="relative bg-black rounded-xl overflow-hidden mb-4 flex-1 flex items-center justify-center" />

      {/* Start Camera Button */}
      {/* {!isCameraOn && (
        <button onClick={startCamera} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
          Open Camera
        </button>
      )} */}

      {/* Capture Button */}
      {/* {isCameraOn && (
        <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded mt-2">
          Capture Image
        </button>
      )} */}
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mb-6">
          {!isCameraOn ? (
            <button
              onClick={startCamera}
              disabled={isProcessing}
              className={`flex items-center px-6 py-3 rounded-full shadow-md ${
                isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium transition-colors`}
            >
              {isProcessing ? 'Loading...' : (
                <>
                  <FiVideo className="mr-2" />
                  Open Camera
                </>
              )}
            </button>
          ) : (
            <>
              <button
                onClick={captureImage}
                disabled={isProcessing}
                className={`flex items-center px-6 py-3 rounded-full shadow-md ${
                  isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                } text-white font-medium transition-colors`}
              >
                <FiCamera className="mr-2" />
                Capture
              </button>
              {/* <button
                onClick={resetScanner}
                className="flex items-center px-6 py-3 rounded-full shadow-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                <FiX className="mr-2" />
                Reset
              </button> */}
            </>
          )}
        </div>


      {/* Hidden Canvas for Image Processing */}
      <canvas ref={canvasRef} hidden />

      {/* Results Section */}
      {image && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800">Captured Image</h3>
            </div>
            <img 
              src={image} 
              alt="Captured" 
              className="w-full object-contain max-h-64"
            />
          </div>
        )}
      {/* Display Extracted Text */}
      {scannedText && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 flex-1">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800">Extracted Ingredients</h3>
            </div>
            <div className="p-4">
              <div className="whitespace-pre-line text-gray-700">
                {scannedText}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(scannedText);
                  alert("Text copied to clipboard!");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
    </div>
    </div>
  );
};

export default CameraCapture;
