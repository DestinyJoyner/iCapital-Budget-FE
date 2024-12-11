import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthProvider.jsx";
import AppHeader from "../components/appHeader/AppHeader.jsx";
import Loading from "../components/loading/Loading.jsx";
import "../styles/Verification.scss";

export default function Verification() {
  const { API, userAuth, axios, setUserAuth } = useAuthProvider();
  const { verificationToken } = useParams();
  const navigate = useNavigate();

  const [verificationError, setVerificationError] = useState(null);

  const [loading, setLoading] = useState(false);

  // function to resend verification code if fails
  function resendVerificationCodeSubmit(e) {
    e.preventDefault();
    // console.log("resend")
    setLoading(true);
    const userEmail = localStorage.getItem("icapital_user_email");
    axios
      .post(`${API}/auth/verification/resend-token`, { email: userEmail })
      .then(({ data }) => {
        // console.log("resed success")
        setVerificationError(false);
        setLoading(false);
        navigate("/verification");
      })
      .catch((err) => {
        console.log("resend verification token", err);
        setLoading(false);
        setVerificationError(
          err.response?.data.error || "Failed to resend verification token"
        );
      });
  }

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
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);

          setVerificationError(
            err.response?.data.error || "Verification failed"
          );
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="verification ">
      <AppHeader />
      {!verificationToken ? (
        <section className="verification_emailCheck flex-column-center">
          <h2>Check Email for Verification Link</h2>
          <span className="subtext-font">
            Please check your inbox for the verification email. If you don't see
            it, be sure to check your spam or junk folder.{" "}
          </span>
          <span className="verification_emailCheck_note subtext-font">
            This verification step is necessary to ensure the security of your
            account and to confirm your email address.
          </span>
        </section>
      ) : loading ? (
        <Loading />
      ) : (
        <div className="verification_error flex-column-center">
          <h2>Verification Failed</h2>
          <span>{verificationError}</span>
          <button
            className="landingPage_enter"
            onClick={(e) => resendVerificationCodeSubmit(e)}
          >
            Resend Verification Link
          </button>
        </div>
      )}
    </div>
  );
}
