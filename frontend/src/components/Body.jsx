import React from "react";
import logo from "./images/logo.jpg"
import { FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import Header from "./Header";
import scan from "./images/grommet-icons_qr.png" 
const Body = ()=>{
    return (
        <div>
            <Header/>
            <div className="bg-gray-500 text-center w-90 h-50 rounded-2xl my-10 mx-auto p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quas reiciendis dignissimos rem sunt eligendi deleniti reprehenderit voluptatibus provident vel? Animi deserunt ex, velit quisquam alias minus nisi quibusdam neque.</div>
            <img className="w-90 mx-auto my-10 " src={scan} alt="scan_Icon" />
            <button className="bg-blue-600 w-30 font-bold rounded-xl h-15 mx-45 my-10">Scan</button>
        </div>
    )
}
export default Body; 