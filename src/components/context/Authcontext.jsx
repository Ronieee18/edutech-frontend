import { useState,createContext, useEffect } from "react";
import { authStatus, loginUser, logoutUser, signupUser } from "../apihandler/api";
const AuthContext=createContext({isLoggedIn:false})
const AuthProvider=({children})=>{
    const  [user,setUser]=useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        async function checkAuthStatus(){
            const data=await authStatus();
            if(data){
                setUser(data.user);
                setIsLoggedIn(true);
            }
        }
        checkAuthStatus();
    },[])

    const login=async(email,password)=>{
        const data=await loginUser(email,password);
        if(data){
            setUser(data.user);
            setIsLoggedIn(true);
        }
    }

    const signup=async(name,email,password)=>{
        const data=await signupUser(name,email,password);
        if(data){
            setUser(data.user);
            setIsLoggedIn(true);
        }
    }

    const logout=async()=>{
        await logoutUser();
        setUser({});
        setIsLoggedIn(false);
        // window.location.reload();

    }

    const useAuth={
        isLoggedIn,
        login,
        signup,
        logout,
        user
    }
    return <AuthContext.Provider value={useAuth}>{children}</AuthContext.Provider>

    
};
export  {AuthProvider,AuthContext};