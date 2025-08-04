import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import Body from './components/Body';
import Profile from './components/Profile';
import CameraCapture from './components/CameraCapture';
import Login from './components/Login';


// Create a ProtectedRoute component
const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated} = useAuth0();


  return isAuthenticated ? element : <Login />;
};

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin,
        scope: 'openid profile email'
      }}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route 
            path="/profile" 
            element={<ProtectedRoute element={<Profile />} />} 
          />
          <Route 
            path="/camera" 
            element={<ProtectedRoute element={<CameraCapture />} />} 
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;