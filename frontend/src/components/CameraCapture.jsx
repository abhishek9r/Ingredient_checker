import React, { useRef, useState } from "react";
import { FiCamera, FiVideo, FiX, FiSearch } from "react-icons/fi";
import axios from "axios";

const CameraCapture = () => {
  // Camera states
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedText, setScannedText] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  // Search states
  const [results, setResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // API base URL
// At the top of your file
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ... rest of your component code remains the same

  // Start Camera
  const startCamera = async () => {
    try {
      setIsProcessing(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStream(stream);
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Camera access denied. Please allow camera permissions.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOn(false);
  };

  // Capture Image
  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      setIsProcessing(true);
      try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setImage(imageUrl);
        await processWithBackend(imageUrl);
      } catch (error) {
        console.error("Capture Error:", error);
        alert("Failed to capture image. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Process with Backend API
  const processWithBackend = async (imageUrl) => {
    try {
      setIsProcessing(true);
      setSearchError(null);
      
      const response = await axios.post(`${API_BASE_URL}/api/process-image`, {
        imageData: imageUrl
      });
      
      setScannedText(response.data.text);
    } catch (error) {
      console.error("API Error:", error);
      setSearchError(error.response?.data?.error || "Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  };

  // Analyze ingredients with Backend
  const analyzeIngredients = async (ingredientsText) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      
      if (!ingredientsText.trim()) {
        throw new Error("No ingredients to analyze");
      }
      
      const response = await axios.post(`${API_BASE_URL}/api/analyze-text`, {
        text: ingredientsText
      });
      
      return response.data;
    } catch (error) {
      console.error("Analysis Error:", error);
      setSearchError(error.response?.data?.error || error.message);
      return null;
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle Search
  const handleSearch = async () => {
    if (!scannedText.trim()) {
      setSearchError("No extracted text to analyze. Please capture an image first.");
      return;
    }
    
    const analysis = await analyzeIngredients(scannedText);
    setResults(analysis);
  };

  // Reset scanner
  const resetScanner = () => {
    stopCamera();
    setImage(null);
    setScannedText("");
    setResults(null);
    setSearchError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ingredient Scanner</h2>

        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`relative bg-black rounded-xl overflow-hidden mb-4 flex-1 flex items-center justify-center ${
            !isCameraOn ? 'hidden' : ''
          }`}
        />
        
        {!isCameraOn && (
          <div className="bg-gray-200 rounded-xl mb-4 flex-1 flex items-center justify-center">
            <p className="text-gray-500">Camera is off</p>
          </div>
        )}

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
              <button
                onClick={resetScanner}
                className="flex items-center px-6 py-3 rounded-full shadow-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                <FiX className="mr-2" />
                Reset
              </button>
            </>
          )}
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

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

        {scannedText && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800">Extracted Ingredients</h3>
            </div>
            <div className="p-4">
              <div className="whitespace-pre-line text-gray-700 mb-4">
                {scannedText}
              </div>
              <button
                onClick={handleSearch}
                disabled={searchLoading}
                className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {searchLoading ? (
                  "Analyzing..."
                ) : (
                  <>
                    <FiSearch className="mr-2" />
                    Analyze Ingredients
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {searchError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{searchError}</p>
          </div>
        )}

        {/* Analysis Results */}
        {results && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ingredient Analysis</h3>
            
            {/* Overall Assessment */}
            {results.overallAssessment && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Overall Assessment</h4>
                <p>{results.overallAssessment}</p>
              </div>
            )}
            
            {/* Individual Ingredients */}
            {results.ingredients?.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm mt-1">{item.description}</p>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Health Impact:</span> 
                    <span className={`ml-1 ${
                      item.healthImpact === 'high' ? 'text-red-600' :
                      item.healthImpact === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {item.healthImpact}
                    </span>
                  </div>
                  
                  <div>
                    <span className="font-semibold">Allergens:</span> 
                    <span className={`ml-1 ${item.potentialAllergens ? 'text-red-600' : 'text-green-600'}`}>
                      {item.potentialAllergens ? 'Potential' : 'None detected'}
                    </span>
                  </div>
                </div>
                
                {item.commonUses && (
                  <div className="mt-2 text-sm">
                    <span className="font-semibold">Common Uses:</span> {item.commonUses}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;