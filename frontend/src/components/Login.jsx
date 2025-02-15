import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";

const Login = ()=>{
    
        const { loginWithRedirect, user, isAuthenticated } = useAuth0();
        console.log("current user", user); 
        return (
            <div>
                {isAuthenticated ? user.name  : <button onClick={() => loginWithRedirect()}>Log In</button>}
            </div>
        )
        
    
}

export default Login; 
