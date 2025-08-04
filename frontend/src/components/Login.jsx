import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LogoutButton from "./Logout";

const Login = () => {
  const { 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated, 
    getAccessTokenSilently 
  } = useAuth0();

  // Automatically create/update user in your database after login
  useEffect(() => {
    const handleUserSync = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          
          // Send user data to your backend
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/create`,
            {}, // Empty body since we'll use the token payload
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          console.log("User synced with backend");
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    handleUserSync();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user.name}</span>
          <LogoutButton />
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default Login;