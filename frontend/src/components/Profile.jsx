import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import scan from "../assets/images/icons.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [activeTab, setActiveTab] = useState('Personal');
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    glutenFree: false,
    peanutAllergy: false,
    dairyFree: false,
    shellfishAllergy: false,
    soyAllergy: false,
    eggAllergy: false,
    treeNutAllergy: false,
    fishAllergy: false,
    halal: false,
    kosher: false,
    vegan: false,
    vegetarian: false,
    lactoseIntolerant: false
  });

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const savePreferences = async () => {
    try {
      // Here you would typically make an API call to save the preferences
      // Example:
      // const response = await fetch('/api/preferences', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ user: user.sub, restrictions: preferences })
      // });
      // const data = await response.json();
      
      setIsPreferenceModalOpen(false);
      // Optionally show a success message
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Dietary Restrictions</h3>
              <button 
                onClick={() => setIsPreferenceModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {Object.values(preferences).some(Boolean) ? 'Edit Preferences' : 'Set Preferences'}
              </button>
            </div>
            
            {Object.values(preferences).some(Boolean) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.entries(preferences)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <div key={key} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No Preferences Set</h3>
                <p className="mt-2 text-gray-500">Set your dietary preferences and restrictions</p>
              </div>
            )}
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

      {/* Preference Modal */}
      {isPreferenceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Set Dietary Preferences</h3>
                <button 
                  onClick={() => setIsPreferenceModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'glutenFree', label: 'Gluten Free' },
                      { id: 'peanutAllergy', label: 'Peanut Allergy' },
                      { id: 'dairyFree', label: 'Dairy Free' },
                      { id: 'shellfishAllergy', label: 'Shellfish Allergy' },
                      { id: 'soyAllergy', label: 'Soy Allergy' },
                      { id: 'eggAllergy', label: 'Egg Allergy' },
                      { id: 'treeNutAllergy', label: 'Tree Nut Allergy' },
                      { id: 'fishAllergy', label: 'Fish Allergy' },
                      { id: 'halal', label: 'Halal' },
                      { id: 'kosher', label: 'Kosher' },
                      { id: 'vegan', label: 'Vegan' },
                      { id: 'vegetarian', label: 'Vegetarian' },
                      { id: 'lactoseIntolerant', label: 'Lactose Intolerant' }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center">
                        <input
                          id={item.id}
                          name={item.id}
                          type="checkbox"
                          checked={preferences[item.id]}
                          onChange={handlePreferenceChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={item.id} className="ml-3 block text-sm text-gray-700">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPreferenceModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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