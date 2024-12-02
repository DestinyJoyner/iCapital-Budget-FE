import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import Loading from "../loading/Loading.jsx";
import { handleFormTextInput } from "../../utils/authFormFunctions.js";
import { logOutUser } from "../../utils/authFunctions.js";
import "./LoginForm.scss";

export default function LoginForm() {
  const { API, axios, setUserAuth, userAuth } = useAuthProvider();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleLoginSubmit(e) {
    e.preventDefault();
    // loading state
    setLoading(true);

    axios
      .post(`${API}/auth/login`, {
        login: loginForm,
      })
      .then(({ data }) => {
        // remove prev error if any
        setLoginError(null);
        const { token, user_id } = data;
        setUserAuth({
          ...userAuth,
          user_id,
          authToken: token,
          email: loginForm["email"],
        });
        localStorage.setItem("icapital_user_email", loginForm["email"]);
        localStorage.setItem("token", token);

        //   timeout for loading while fetching b4 navigate
        setTimeout(() => {
          // HERE NAVIGATE TO PROTECTED ROUTE (USER DASHBOARD) TO THEN MAKE CALL WITH TOKEN TO GET USER BUDGET INFO
          navigate("/dashboard");
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        // log out for testing only will implement route availabilty once logged in
        logOutUser(setUserAuth);
        // in case of login credentials error trigger error state and display to user
        if (err.response) {
          setLoginError(
            err.response.data.error || "Something went wrong. Try Again"
          );
        }
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <form
      className="loginForm app-card flex-column"
      onSubmit={(event) => handleLoginSubmit(event)}
    >
      <h2>Login</h2>
      <label>
        <input
          value={loginForm["email"]}
          id={"email"}
          type="text"
          onChange={(event) =>
            handleFormTextInput(event, loginForm, setLoginForm)
          }
        />
        <span>Email</span>
      </label>

      <label>
        <input
          type="password"
          value={loginForm["password"]}
          id={"password"}
          onChange={(event) =>
            handleFormTextInput(event, loginForm, setLoginForm)
          }
          disabled={loading}
        />
        <span>Password</span>
      </label>

      <input type="submit" value="Login" />

      {loading && <Loading />}
      {loginError && <span className="loginForm_error">{loginError}</span>}
    </form>
  );
}
