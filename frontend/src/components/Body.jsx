// import React from "react";
// import logo from "./images/logo.jpg"
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import scan from "./images/grommet-icons_qr.png" 
// import CameraCapture from "./CameraCapture";
// const Body = ()=>{
//     const cameraHandler = ()=>{
//             <CameraCapture/>
//             // console.log("hh")
//     } 
//     return (
//         <div>
//             <Header/>
//             <div className="bg-gray-500 text-center w-90 h-50 rounded-2xl my-10 mx-auto p-2">
//                 jindagi sawar dun ek nai bahar dun duniya hi badldun
//                 me to pyara sa chamatkar hun ,
//                 me kisi ka sapna hu jo aaj ban chuka hu sach
//                 ab ye mera spna hai ki sbke sapne sach me karun
//                 asama ka chuun lun titli ban udu 
//                 ...
//                 ya ha ha me hu ek udta robo
//                 doraemon 
//             </div>
//             <img className="w-90 mx-auto my-10 " src={scan} alt="scan_Icon" />
            
//             <Link to="/camera" className="font-bold mx-2 my-1 hover:text-gray-400">
//             <button className="bg-blue-600 w-30 font-bold rounded-xl h-15 mx-45 my-10 cursor-pointer" onClick={()=>{cameraHandler()}}>Scan</button>
//             </Link>
//         </div>
//     )
// }
// export default Body; 

import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import scan from "./images/grommet-icons_qr.png";

const Body = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ingredient Checker</h1>
          <p className="text-gray-600">
            Scan product barcodes to instantly check ingredients for allergens, 
            dietary restrictions, or personal preferences.
          </p>
        </div>
        
        {/* Scan Illustration */}
        <div className="mb-8 ">
          <img 
            src={scan} 
            alt="Scan Icon" 
            className="w-24 h-24 mx-auto"
          />
        </div>
        
        {/* Scan Button */}
        <Link 
          to="/camera" 
          className="w-full max-w-xs mx-auto"
        >
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
            Scan Product
          </button>
        </Link>
        
        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Allergen Detection</h3>
            <p className="text-sm text-gray-600">Identify common allergens in products instantly</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Dietary Filters</h3>
            <p className="text-sm text-gray-600">Check for vegan, gluten-free, or other dietary needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;