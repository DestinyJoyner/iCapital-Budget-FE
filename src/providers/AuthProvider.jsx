import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthData = createContext()
export function useAuthProvider() {
    return useContext(AuthData)
}

const API = import.meta.env.VITE_API_URL

export default function AuthProvider ({children}) {
    const [userAuth, setUserAuth] = useState({
        first_name:"",
        user_id:"",
        authToken:"",
        email: ""
    })
    const [verificationToken, setVerificationToken] = useState(null)
    // const [authToken, setAuthToken] = useState(null)
    // const [userId, setUserId] = useState(null)

    // axios.defaults.headers.common["authorization"] = token

    return (
        <AuthData.Provider value={{
            API,
            axios,
            verificationToken, 
            setVerificationToken,
            userAuth,
            setUserAuth
        }}>
            {children}
        </AuthData.Provider>
    )
}

