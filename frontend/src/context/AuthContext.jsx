import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(() => {return !localStorage.getItem("token")})


useEffect(() => {
    const token = localStorage.getItem("token")
    
    // if (token) {
        // Call your backend API here to verify the token
      // If invalid, clear storage and set state to false
    // }
},[])
    return <AuthContext.Provider value={{isAuth, setIsAuth}}>
        {children}    
    </ AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)