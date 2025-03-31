// import React from "react";
// import Header from "./Header";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useState } from "react";
// import scan from "./images/grommet-icons_qr.png" ;


// const Profile = () => {
//     const { loginWithRedirect, user, isAuthenticated } = useAuth0();
//     const [activeTab, setActiveTab] = useState('Personal');
  
//     console.log("current user", user);
  
//     return (
//       <div>
//         <Header />
//         {/* Profile Picture */}
//         <div className="bg-gray-500 text-center w-30 h-30 rounded-full my-4 mx-auto">
//           <img
//             className="w-30 h-30 rounded-full mx-auto my-4"
//             src={user.picture}
//             alt={user.given_name}
//           />
//         </div>
  
//         {/* Tabs */}
//         <div className="bg-gray-500 w-110 h-95 rounded-2xl my-5 mx-auto p-4">
//           {/* Tab Buttons */}
//           <div className="flex justify-around mb-4">
//             <button
//               className={`px-4 py-2 rounded-lg ${
//                 activeTab === 'Personal' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
//               }`}
//               onClick={() => setActiveTab('Personal')}
//             >
//               Personal
//             </button>
//             <button
//               className={`px-4 py-2 rounded-lg ${
//                 activeTab === 'Preference' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
//               }`}
//               onClick={() => setActiveTab('Preference')}
//             >
//               Preference
//             </button>
//             <button
//               className={`px-4 py-2 rounded-lg ${
//                 activeTab === 'History' ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'
//               }`}
//               onClick={() => setActiveTab('History')}
//             >
//               History
//             </button>
//           </div>
  
//           {/* Tab Content */}
//           <div className="text-white">
//             {activeTab === 'Personal' && (
//               <>
//                  {/* <p className="text-lg font-bold">Personal Details</p> */}
//               <ul className="mt-4">
//                 <li className="mb-2">
//                   <span className="font-semibold">Name:</span> {user.name}
//                 </li>
//                 <li className="mb-2">
//                   <span className="font-semibold">Email:</span> {user.email}
//                 </li>
//                 {/* Add more details if needed */}
//               </ul>
//               </>
//             )}
//             {activeTab === 'Preference' && (
//               <p>Preference content goes here.</p>
//             )}
//             {activeTab === 'History' && (
//               <p>History content goes here.</p>
//             )}
//           </div>
//         </div>
  
//         {/* Scan Button */}
//         <button className="bg-blue-600 w-30 font-bold rounded-xl h-15 mx-40 my-2">
//           Scan
//         </button>
//       </div>
//     );
//   };
  
// export default Profile;


import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import scan from "./images/grommet-icons_qr.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [activeTab, setActiveTab] = useState('Personal');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <p className="text-lg text-gray-600 mb-6">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4">
        <div className="relative">
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            src={user.picture}
            alt={user.name}
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mt-4">{user.name}</h1>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 px-4">
        <nav className="flex space-x-8">
          {['Personal', 'Preference', 'History'].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm mx-4 my-6 p-6">
        {activeTab === 'Personal' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Information</h3>
              <div className="mt-2 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                {user.given_name && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">First Name</span>
                    <span className="font-medium">{user.given_name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Preference' && (
          <div className="text-center py-10">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Your Preferences</h3>
            <p className="mt-2 text-gray-500">Set your dietary preferences and restrictions here</p>
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Edit Preferences
            </button>
          </div>
        )}

        {activeTab === 'History' && (
          <div className="text-center py-10">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Scan History</h3>
            <p className="mt-2 text-gray-500">View your previously scanned products</p>
          </div>
        )}
      </div>

      {/* Scan Button */}
      <div className="fixed bottom-6 right-6">
        <Link to="/camera">
          <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
            <img src={scan} alt="Scan" className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;