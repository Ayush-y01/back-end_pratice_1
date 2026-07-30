import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [user, setUser ] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

 

   async function fetchUser() {
     try {
        const {data} = await axios.get(`http://localhost:3000/user/profile`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        setUser(data)
        setIsAuth(true)
    } catch (error) {
        console.log(error?.message);
    }finally{
        setLoading(false)
    }
   }

   const logoutUser = () => {
    localStorage.removeItem("token","")
    setUser(null)
    setIsAuth(false)
   }
   
   useEffect(() => {
    fetchUser()
   },[])


    return <AuthContext.Provider value={{ loading, setIsAuth,isAuth ,setLoading,setUser, user, logoutUser}}>
        {children}    
    </ AuthContext.Provider>
}

export const useAuth = () => { 
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Use Auth must be used within app provider")
    }

    return context
}