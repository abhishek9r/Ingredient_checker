// import React from "react";
// import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
// import logo from "./images/logo.jpg"
// import Login from "./Login";
// import { useAuth0 } from "@auth0/auth0-react";
// import LogoutButton from "./Logout";
// const Header = ()=>{
// const {isAuthenticated} = useAuth0(); 

//     return (
//         <div>
//             <div className="flex justify-between bg-gray-300 p-1 border-b-1 w-390px h-10 ">
//            <img className ="w-8 p-1 border-1" src={logo} alt="logo" />
//            <div className="flex justify-around">
           
//            {isAuthenticated ?  <LogoutButton/>  : <div className="font-bold mx-3"><Login/></div>}
//            {/* <div className="font-bold mx-2 my-1">Profile</div> */}
//            {location.pathname === '/profile' ? (
//             <Link to="/" className="font-bold mx-2 my-1 hover:text-gray-400">
//               Home
//             </Link>
//           ) : (
//             <Link to="/profile" className="font-bold mx-2 my-1 hover:text-gray-400">
//               Profile
//             </Link>
//           )}

//            </div>
            
//            </div>
//         </div>
//     )
// }

// export default Header; 


import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/images/Logo.jpg"
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
          />
          <span className="ml-2 font-bold text-blue-600 hidden sm:inline">IngredientCheck</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {location.pathname === '/profile' ? (
                <Link 
                  to="/" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              ) : (
                <Link 
                  to="/profile" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Profile
                </Link>
              )}
              <LogoutButton className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" />
            </>
          ) : (
            <Login className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors" />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;