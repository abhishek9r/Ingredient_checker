import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from "./images/logo.jpg"
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
const Header = ()=>{
const {isAuthenticated} = useAuth0(); 

    return (
        <div>
            <div className="flex justify-between bg-gray-300 p-1 border-b-1 w-390px h-10 ">
           <img className ="w-8 p-1 border-1" src={logo} alt="logo" />
           <div className="flex justify-around">
           
           {isAuthenticated ?  <LogoutButton/>  : <div className="font-bold mx-3"><Login/></div>}
           {/* <div className="font-bold mx-2 my-1">Profile</div> */}
           {location.pathname === '/profile' ? (
            <Link to="/" className="font-bold mx-2 my-1 hover:text-gray-400">
              Home
            </Link>
          ) : (
            <Link to="/profile" className="font-bold mx-2 my-1 hover:text-gray-400">
              Profile
            </Link>
          )}

           </div>
            
           </div>
        </div>
    )
}

export default Header; 