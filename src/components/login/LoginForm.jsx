import { useState } from "react";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import { handleFormTextInput } from "../../utils/authFormFunctions.js";
import "./LoginForm.scss";

export default function LoginForm() {
  const { API, axios, setUserAuth, userAuth } = useAuthProvider();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  // handleFormTextInput(e, stateVariable, setFunction)

  function handleLoginSubmit(e) {
    e.preventDefault();
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

        // HERE NAVIGATE TO PROTECTED ROUTE (USER DASHBOARD) TO THEN MAKE CALL WITH TOKEN TO GET USER BUDGET INFO
      })
      .catch((err) => {
        // in case of login credentials error trigger error state and display to user
        if (err.response) {
          setLoginError(
            err.response.data.error || "Something went wrong. Try Again"
          );
        }
        console.log(err);
      });
  }

  return (
    <form className="loginForm" onSubmit={(event) => handleLoginSubmit(event)}>
      <label>
        <span>Email</span>
        <input
          value={loginForm["email"]}
          id={"email"}
          type="text"
          onChange={(event) =>
            handleFormTextInput(event, loginForm, setLoginForm)
          }
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          value={loginForm["password"]}
          id={"password"}
          onChange={(event) =>
            handleFormTextInput(event, loginForm, setLoginForm)
          }
        />
      </label>

      <input type="submit" value="Login" />

      {loginError && <span className="loginForm_error">{loginError}</span>}
    </form>
  );
}
