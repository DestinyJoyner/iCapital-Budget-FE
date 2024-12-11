import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthProvider.jsx";
import { handleFormTextInput } from "../utils/authFormFunctions.js";
import Loading from "../components/loading/Loading.jsx";
import AppHeader from "../components/appHeader/AppHeader.jsx";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import "../styles/PasswordReset.scss";

export default function PasswordReset() {
  // page linked from email, with verfication code in url -> useParams() to send to BE password controller in useEffect, when validated, reveal new password form on submission, send to be for PUT request

  // no verificationToken, means just linked here to initiate password rest, user submits email for verification, then receives email, then linked back here w/ token to set new password

  const { API, axios, setUserAuth, userAuth } = useAuthProvider();
  const { verificationToken } = useParams();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [resetLinkSent, setResetLink] = useState(false);

  const [tokenVerified, setTokenVerified] = useState(false);
  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(null)

  function handleEmailSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API}/auth/password`, { email: userEmail })
      .then(({ data }) => {
        setResetLink(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("password reset request failed,", err);
      });
  }

  // submission on new passwords, send verfication token in body

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // axios.put(`${API}/auth/password/reset`).then(({data}) => console.log(data)).catch(err => console.log("not reading route"))
    axios
      .put(`${API}/auth/password/reset`, {
        password: password["new_password"],
        verificationToken: verificationToken,
      })
      .then(({ data }) => {
        // console.log("password reset res",data)
        const { token, email, first_name } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("icapital_user_email", email);
        localStorage.setItem("icapital_user_first_name", first_name);
        // update user auth as its checked in protected route for dashboard
        setUserAuth({
          ...userAuth,
          authToken: token,
          email: email,
          first_name: first_name,
        });

        // delay to wait for state update
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard");
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
        if(err.response?.data?.errors){
          setPasswordError(err.response.data.errors[0].msg)
        }
        else {
          setPasswordError("An unexpected Error has occured. Try again")
        }
        console.log("password change error", err);
      });
  }

  // verify token in url
  useEffect(() => {
    if (verificationToken) {
      axios
        .get(`${API}/auth/password/verify-token/${verificationToken}`)
        .then(({ data }) => {
          setUserEmail(data.email);
          setTokenVerified(true);
        })
        .catch((err) => console.log("Verification Token error", err));
    }
  }, []);

  // track values for password and confirm password
  useEffect(() => {
    if (password["new_password"] && password["confirm_password"]) {
      if (password["new_password"] === password["confirm_password"]) {
        setPasswordMatch(true);
      }
      else {
        setPasswordMatch(false)
      }
    }
    else {
      setPasswordMatch(false)
    }
  }, [password["new_password"], password["confirm_password"]]);

  return (
    <div className="password_reset ">
      <AppHeader />
      {!verificationToken ? (
        !resetLinkSent ? (
          <form
            className="password_reset_emailForm authPage_forms flex-column-center"
            onSubmit={(e) => handleEmailSubmit(e)}
          >
            <h2>Password Reset Request</h2>
            <h4>Enter Email Address</h4>
            <label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </label>
            <input type="submit" disabled={loading} />
            {loading && <Loading />}
          </form>
        ) : (
          <section className="password_reset_emailCheck flex-column-center">
            <h2>
              Check Email for Password Reset Link
            </h2>
            <span className="subtext-font">
    Please check your inbox for the password reset link. If you don't see it, be sure to check your spam or junk folder.
  </span>
  <span className="password_reset_emailCheck_note subtext-font">This secure process helps protect your account. The reset link will expire in 1hr for security purposes</span>
          </section>
        )
      ) : verificationToken && tokenVerified ? (
        <form
          className="password_reset_form authPage_forms flex-column-center"
          onSubmit={(e) => handlePasswordSubmit(e)}
        >
          <h2>Create New Password</h2>
          <label>
            <div className = "password_container">
            <input
              type={showPassword ? "text" : "password"}
              id={"new_password"}
              value={password["new_password"]}
              onChange={(e) => handleFormTextInput(e, password, setPassword)}
            />
            <button className="password_show"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setShowPassword(!showPassword)}}>{showPassword ? "Hide" : "Show"}</button>
            </div>
           
            <span>New Password</span>
            <p className="helperText">8+ chars: upper, lower, number, symbol</p>
          </label>

          <label>
            <input
              type={showPassword ? "text" : "password"}
              id={"confirm_password"}
              value={password["confirm_password"]}
              onChange={(e) => handleFormTextInput(e, password, setPassword)}
            />
            <span>Confirm New Password</span>
          </label>
          <span className="password_match">
            {passwordMatch ? <span><FaCheckCircle color={"green"} /> Passwords Match  </span>: <span> <FaCircleXmark color={"red"} /> Passwords don't meet requirements</span>}
          </span>
          {passwordError && <span className="registration_form_error">{passwordError}</span>}
          {passwordMatch && <input type="submit" disabled={loading} />}
          
          {loading && <Loading />}
        </form>
      ) : (
        // <Navigate to="/auth" />
        <h2>Something went wrong</h2>
      )}
    </div>
  );
}
