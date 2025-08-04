// Create a new UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setDbUser(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    syncUser();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <UserContext.Provider value={{ dbUser, setDbUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);