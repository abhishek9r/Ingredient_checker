import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [scannedText, setScannedText] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);

  // Start Camera
  const startCamera = async () => {
    try {
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

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Ingredients Scanner</h2>

      {/* Video Display */}
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm border rounded" />

      {/* Start Camera Button */}
      {!isCameraOn && (
        <button onClick={startCamera} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
          Open Camera
        </button>
      )}

      {/* Capture Button */}
      {isCameraOn && (
        <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded mt-2">
          Capture Image
        </button>
      )}

      {/* Hidden Canvas for Image Processing */}
      <canvas ref={canvasRef} hidden />

      {/* Display Captured Image */}
      {image && (
        <div>
          <h3>Captured Image Preview:</h3>
          <img src={image} alt="Captured Image" width="100%" />
        </div>
      )}

      {/* Display Extracted Text */}
      {scannedText && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold">Extracted Ingredients:</h3>
          <p>{scannedText}</p>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
