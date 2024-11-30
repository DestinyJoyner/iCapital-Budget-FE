import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthProvider.jsx";
import Loading from "../components/loading/Loading.jsx"
import {logOutUser} from "../utils/authFunctions.js"

export default function ProtectedRoute({ element: Component }) {
  // condition if authToken is found, then  send request to verify to match stored email in order to authenticate and access protected routes
  const { userAuth, API, axios, setUserAuth } = useAuthProvider();

  const { email, authToken } = userAuth;

  const [validCredentials, setValidCredentials] = useState(false);

  //   create loading component
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuthToken() {
      if (!authToken || !email) {
        setValidCredentials(false);
        logOutUser(setUserAuth)
        // loading component can be added here
        setLoading(false);
        return;
      } else {
        try {
          await axios
            .get(`${API}/auth/token`)
            .then(({ data }) => {
                if(!data || data !== email){
                    setValidCredentials(false)
                    logOutUser(setUserAuth)
                }else {
                    setValidCredentials(data === email)
                }
                })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log("Token verification failed");
          setValidCredentials(false);
        //   clear out localStorage
       logOutUser(setUserAuth)
        } finally {
          setLoading(false);
        }
      }
    }
    verifyAuthToken();
  }, [authToken, email]);

  /* 
    replace :
    Without replace: User clicks back button → Returns to protected route → Redirects again
    With replace: User clicks back button → Goes to previous page before the redirect
  */

  if (loading) {
    return <Loading />;
  }
  return validCredentials ? <Component /> : <Navigate to="/auth" replace />;
}
