import { useEffect,} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthProvider.jsx";

export default function Verification() {
  const { API, userAuth, axios, setUserAuth } = useAuthProvider();
  const { verificationToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (verificationToken) {
      // if verification code is in url, sen req to auth/verification, if valid, response will hold auth token => setAuthToken

      axios
        .post(`${API}/auth/verification`, {
          email: localStorage.getItem("icapital_user_email"),
          verification_token: verificationToken,
        })
        .then(({ data }) => {
          if (data.is_verified) {
            console.log("email verified");
            localStorage.setItem("token", data.token);
            setUserAuth({
              ...userAuth,
              authToken: data.token,
              user_id: data.user.id,
              is_verified: data.is_verified,
            });
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="verification">
      {!verificationToken ? (
        <h1>Check Email</h1>
      ) : (
        <h2>Loading until verified</h2>
      )}
    </div>
  );
}
