import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthData = createContext();
export function useAuthProvider() {
  return useContext(AuthData);
}

const API = import.meta.env.VITE_API_URL;

export default function AuthProvider({ children }) {
//   const authToken = localStorage.getItem("token");
  const userEmail = localStorage.getItem("icapital_user_email");
  const [userAuth, setUserAuth] = useState({
    first_name: "",
    user_id: "",
    authToken: localStorage.getItem("token") || "",
    email: localStorage.getItem("icapital_user_email") || "",
  });
  const [verificationToken, setVerificationToken] = useState(null);

  // update token in headers whenever token value changes
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${userAuth.authToken}`;
      setUserAuth({...userAuth, authToken : authToken})
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  }, []);
//   useEffect(() => {
//     if (userAuth.authToken) {
//         axios.defaults.headers.common["authorization"] = `Bearer ${userAuth.authToken}`;
//     }
// }, [userAuth.authToken]);

  return (
    <AuthData.Provider
      value={{
        API,
        axios,
        verificationToken,
        setVerificationToken,
        userAuth,
        setUserAuth,
      }}
    >
      {children}
    </AuthData.Provider>
  );
}
