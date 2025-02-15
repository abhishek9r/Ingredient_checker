import React from "react";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import scan from "./images/grommet-icons_qr.png" ;


const Profile = () => {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    const [activeTab, setActiveTab] = useState('Personal');
  
    console.log("current user", user);
  
    return (
      <div>
        <Header />
        {/* Profile Picture */}
        <div className="bg-gray-500 text-center w-30 h-30 rounded-full my-4 mx-auto">
          <img
            className="w-30 h-30 rounded-full mx-auto my-4"
            src={user.picture}
            alt={user.given_name}
          />
        </div>
  
        {/* Tabs */}
        <div className="bg-gray-500 w-110 h-95 rounded-2xl my-5 mx-auto p-4">
          {/* Tab Buttons */}
          <div className="flex justify-around mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'Personal' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
              }`}
              onClick={() => setActiveTab('Personal')}
            >
              Personal
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'Preference' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
              }`}
              onClick={() => setActiveTab('Preference')}
            >
              Preference
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'History' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
              }`}
              onClick={() => setActiveTab('History')}
            >
              History
            </button>
          </div>
  
          {/* Tab Content */}
          <div className="text-white">
            {activeTab === 'Personal' && (
              <>
                 {/* <p className="text-lg font-bold">Personal Details</p> */}
              <ul className="mt-4">
                <li className="mb-2">
                  <span className="font-semibold">Name:</span> {user.name}
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </li>
                {/* Add more details if needed */}
              </ul>
              </>
            )}
            {activeTab === 'Preference' && (
              <p>Preference content goes here.</p>
            )}
            {activeTab === 'History' && (
              <p>History content goes here.</p>
            )}
          </div>
        </div>
  
        {/* Scan Button */}
        <button className="bg-blue-600 w-30 font-bold rounded-xl h-15 mx-40 my-2">
          Scan
        </button>
      </div>
    );
  };
  
export default Profile;