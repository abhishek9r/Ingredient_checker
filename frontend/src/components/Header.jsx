import React from "react";
import logo from "./images/logo.jpg"
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
const Header = ()=>{
    const {user} = useAuth0(); 
    console.log("Current User" , user); 
    return (
        <div>
            <div className="flex justify-between bg-gray-300 p-1 border-b-1 w-390px h-10 ">
           <img className ="w-8 p-1 border-1" src={logo} alt="logo" />
           <div className="flex justify-around">
           <div className="font-bold mx-3"><Login/></div>
           <div className="font-bold mx-1">Profile</div>

           </div>
            
           </div>
        </div>
    )
}

export default Header; 