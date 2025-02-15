import React from "react";
import logo from "./images/logo.jpg"
import { Link } from "react-router-dom";
import Header from "./Header";
import scan from "./images/grommet-icons_qr.png" 
import CameraCapture from "./CameraCapture";
const Body = ()=>{
    const cameraHandler = ()=>{
            <CameraCapture/>
            // console.log("hh")
    } 
    return (
        <div>
            <Header/>
            <div className="bg-gray-500 text-center w-90 h-50 rounded-2xl my-10 mx-auto p-2">
                jindagi sawar dun ek nai bahar dun duniya hi badldun
                me to pyara sa chamatkar hun ,
                me kisi ka sapna hu jo aaj ban chuka hu sach
                ab ye mera spna hai ki sbke sapne sach me karun
                asama ka chuun lun titli ban udu 
                ...
                ya ha ha me hu ek udta robo
                doraemon 
            </div>
            <img className="w-90 mx-auto my-10 " src={scan} alt="scan_Icon" />
            
            <Link to="/camera" className="font-bold mx-2 my-1 hover:text-gray-400">
            <button className="bg-blue-600 w-30 font-bold rounded-xl h-15 mx-45 my-10 cursor-pointer" onClick={()=>{cameraHandler()}}>Scan</button>
            </Link>
        </div>
    )
}
export default Body; 