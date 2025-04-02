// import React, { useRef, useState } from "react";
// import Tesseract from "tesseract.js";
// import { FiCamera, FiVideo, FiX } from "react-icons/fi";

// const CameraCapture = () => {
//   // Camera
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [image, setImage] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [scannedText, setScannedText] = useState("");
//   const [isCameraOn, setIsCameraOn] = useState(false);

//   // for Searching ingredients
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Start Camera
//   const startCamera = async () => {
//     try {
//       setIsProcessing(true);
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = devices.filter((device) => device.kind === "videoinput");

//       if (videoDevices.length === 0) {
//         console.error("❌ No cameras found!");
//         alert("No cameras found. Please connect a camera and reload.");
//         return;
//       }

//       // Select the first available camera
//       const selectedDeviceId = videoDevices[0].deviceId;

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { deviceId: selectedDeviceId },
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setIsCameraOn(true);
//         console.log("📷 Camera started successfully!");
//       }
//       setIsProcessing(false);
//     } catch (error) {
//       console.error("❌ Camera Error:", error);
//       alert("Camera access denied. Please allow camera permissions.");
//     }
//   };

//   // Capture Image
//   const captureImage = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (video && canvas) {
//       // Set canvas size same as video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Convert canvas to image URL
//       const imageUrl = canvas.toDataURL("image/png");
//       setImage(imageUrl);
//       processOCR(imageUrl); // Ensure OCR runs
//     }
//   };

//   // Process OCR (Extract Text)
//   const processOCR = async (image) => {
//     const { data: { text } } = await Tesseract.recognize(image, "eng");
//     setScannedText(text);
//     console.log("Extracted Text:", text);
//   };

//     // Reset scanner
//   const resetScanner = () => {
//     stopCamera();
//     setImage(null);
//     setScannedText("");
//   };

//   // for searching ingredients
//   const searchIngredients = async (ingredient) => {
//     const response = await fetch(
//       `https://world.openfoodfacts.org/api/v2/search?fields=product_name,ingredients_text,allergens,nutriscore_grade&json=1&search_terms=${encodeURIComponent(ingredient)}`
//     );
//     const data = await response.json();
    
//     // Process results
//     return data.products.map(product => ({
//       name: product.product_name,
//       ingredients: product.ingredients_text,
//       allergens: product.allergens,
//       nutriscore: product.nutriscore_grade // A to E rating
//     }));
//   };

  
//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const data = await searchIngredients(query);
//       setResults(data);
//     } catch (error) {
//       alert("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
//       <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ingredient Scanner</h2>
 
//       {/* Camera Preview 
//        <div className="relative bg-black rounded-xl overflow-hidden mb-4 flex-1 flex items-center justify-center">
//         {!isCameraOn ? (
//           <div className="text-center p-6 text-gray-400">
//             <FiVideo className="mx-auto text-4xl mb-2" />
//             <p>Camera is off</p>
//           </div>
//         ) : (
//           <video 
//             ref={videoRef} 
//             autoPlay 
//             playsInline 
            
//             className="w-full h-full object-contain"
//           />
//         )}
//       </div> */}

//       {/* Video Display */}
//       <video ref={videoRef} autoPlay playsInline className="relative bg-black rounded-xl overflow-hidden mb-4 flex-1 flex items-center justify-center" />

//       {/* Start Camera Button */}
//       {/* {!isCameraOn && (
//         <button onClick={startCamera} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
//           Open Camera
//         </button>
//       )} */}

//       {/* Capture Button */}
//       {/* {isCameraOn && (
//         <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded mt-2">
//           Capture Image
//         </button>
//       )} */}
//               {/* Action Buttons */}
//               <div className="flex justify-center space-x-4 mb-6">
//           {!isCameraOn ? (
//             <button
//               onClick={startCamera}
//               disabled={isProcessing}
//               className={`flex items-center px-6 py-3 rounded-full shadow-md ${
//                 isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
//               } text-white font-medium transition-colors`}
//             >
//               {isProcessing ? 'Loading...' : (
//                 <>
//                   <FiVideo className="mr-2" />
//                   Open Camera
//                 </>
//               )}
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={captureImage}
//                 disabled={isProcessing}
//                 className={`flex items-center px-6 py-3 rounded-full shadow-md ${
//                   isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
//                 } text-white font-medium transition-colors`}
//               >
//                 <FiCamera className="mr-2" />
//                 Capture
//               </button>
//               {/* <button
//                 onClick={resetScanner}
//                 className="flex items-center px-6 py-3 rounded-full shadow-md bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
//               >
//                 <FiX className="mr-2" />
//                 Reset
//               </button> */}
//             </>
//           )}
//         </div>


//       {/* Hidden Canvas for Image Processing */}
//       <canvas ref={canvasRef} hidden />

//       {/* Results Section */}
//       {image && (
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
//             <div className="p-4 border-b">
//               <h3 className="font-semibold text-gray-800">Captured Image</h3>
//             </div>
//             <img 
//               src={image} 
//               alt="Captured" 
//               className="w-full object-contain max-h-64"
//             />
//           </div>
//         )}
//       {/* Display Extracted Text */}
//       {scannedText && (
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 flex-1">
//             <div className="p-4 border-b">
//               <h3 className="font-semibold text-gray-800">Extracted Ingredients</h3>
//             </div>
//             <div className="p-4">
//               <div className="whitespace-pre-line text-gray-700">
//                 {scannedText}
//               </div>
//               <button
//                 // onChange={(e) => setQuery(e.target.value)}
//                 onClick={( ) => {
//                   // navigator.clipboard.writeText(scannedText);
//                   setQuery("sugar");
//                   // alert("Text copied to clipboard!");
//                 }}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
          
//         )}
//         {results.length > 0 && (
//         <div className="space-y-4">
//           {results.slice(0, 5).map((item, index) => (
//             <div key={index} className="p-3 border rounded-lg bg-white shadow-sm">
//               <h3 className="font-bold">{item.name || "Unnamed Product"}</h3>
//               <div className="text-sm mt-1">
//                 <p><span className="font-semibold">Ingredients:</span> {item.ingredients || "Not specified"}</p>
//                 {item.allergens && (
//                   <p className="text-red-600"><span className="font-semibold">Allergens:</span> {item.allergens}</p>
//                 )}
//                 {item.nutriscore && (
//                   <p>Nutrition Score: <span className={`font-bold ${
//                     item.nutriscore === 'a' ? 'text-green-600' : 
//                     item.nutriscore === 'b' ? 'text-lime-600' :
//                     item.nutriscore === 'c' ? 'text-yellow-600' :
//                     item.nutriscore === 'd' ? 'text-orange-600' : 'text-red-600'
//                   }`}>
//                     {item.nutriscore.toUpperCase()}
//                   </span></p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default CameraCapture;

import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { FiCamera, FiVideo, FiX, FiSearch } from "react-icons/fi";

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
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Start Camera
  const startCamera = async () => {
    try {
      setIsProcessing(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" } // Prefer rear camera
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
        await processOCR(imageUrl);
      } catch (error) {
        console.error("Capture Error:", error);
        alert("Failed to capture image. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Process OCR
  const processOCR = async (imageUrl) => {
    try {
      setIsProcessing(true);
      const { data: { text } } = await Tesseract.recognize(
        imageUrl,
        "eng",
        {
          logger: m => console.log(m),
          tessedit_char_whitelist: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ(),.- '
        }
      );
      setScannedText(text);
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Text recognition failed. Please try capturing again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Search Ingredients
  const searchIngredients = async (ingredient) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      
      if (!ingredient.trim()) {
        throw new Error("Please enter an ingredient to search");
      }
  
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=qvOYkoRjE8qGYXmm4nUuczB7KEwFfHiVR3hpJXDG&query=${encodeURIComponent(ingredient)}&pageSize=5`
      );
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.foods || data.foods.length === 0) {
        throw new Error("No nutritional data found for this ingredient");
      }
  
      // Process USDA-specific response format
      return data.foods.map(food => ({
        name: food.description,
        category: food.foodCategory,
        nutrients: food.foodNutrients
          .filter(n => n.value > 0)
          .map(n => ({
            name: n.nutrientName,
            value: n.value,
            unit: n.unitName
          })),
        servingSize: food.servingSize,
        servingUnit: food.servingSizeUnit
      }));
    } catch (error) {
      console.error("Search Error:", error);
      setSearchError(error.message);
      return [];
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle Search
  const handleSearch = async () => {
    if (!scannedText.trim()) {
      setSearchError("No extracted text to search. Please capture an image first.");
      return;
    }
    
    // Use the first line of scanned text as the search query
    const firstIngredient = scannedText.split('\n')[0].trim();
    const data = await searchIngredients(firstIngredient);
    setResults(data);
  };

  // Reset scanner
  const resetScanner = () => {
    stopCamera();
    setImage(null);
    setScannedText("");
    setResults([]);
    setSearchError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ingredient Scanner</h2>

        <video ref={videoRef} autoPlay playsInline className="relative bg-black rounded-xl overflow-hidden mb-4 flex-1 flex items-center justify-center" />
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
                  "Searching..."
                ) : (
                  <>
                    <FiSearch className="mr-2" />
                    Search for Ingredients
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

        {/* Search Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Search Results</h3>
            {results.slice(0, 5).map((item, index) => (
              <div key={index} className="p-3 border rounded-lg bg-white shadow-sm">
                <h3 className="font-bold">{item.name || "Unnamed Product"}</h3>
                <div className="text-sm mt-1">
                  <p><span className="font-semibold">Ingredients:</span> {item.ingredients || "Not specified"}</p>
                  {item.allergens && item.allergens !== "none" && (
                    <p className="text-red-600"><span className="font-semibold">Allergens:</span> {item.allergens}</p>
                  )}
                  {item.nutriscore && (
                    <p>Nutrition Score: <span className={`font-bold ${
                      item.nutriscore === 'a' ? 'text-green-600' : 
                      item.nutriscore === 'b' ? 'text-lime-600' :
                      item.nutriscore === 'c' ? 'text-yellow-600' :
                      item.nutriscore === 'd' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {item.nutriscore.toUpperCase()}
                    </span></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;