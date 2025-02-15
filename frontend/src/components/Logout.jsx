import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  console.log(user);
  
  return (
    <button className= "font-bold  mx-3" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      LogOut
    </button>
  );
};

export default LogoutButton;