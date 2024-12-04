import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import Loading from "../loading/Loading.jsx";
import "./RegistrationForm.scss";

export default function RegistrationForm() {
  const { API, axios, setVerificationToken, userAuth, setUserAuth } =
    useAuthProvider();

  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  // registration error handling
  const [registrationError, setRegistrationError] = useState(null);

  function handleFormInput(e) {
    const value = e.target.value;
    const id = e.target.id;
    setRegisterForm({ ...registerForm, [id]: value });
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    // trigger loading state
    setLoading(true);
    axios
      .post(`${API}/auth/register`, {
        login: registerForm,
      })
      .then(({ data }) => {
        console.log("res registration", data)
        const { email, first_name, id, is_verified } = data;

        // setVerificationToken(verification_token)
        setUserAuth({
          ...userAuth,
          email,
          first_name,
          id,
          is_verified,
        });
        localStorage.setItem("icapital_user_email", email);

        setTimeout(() => {
          navigate("/verification");
          setLoading(false);
        }, 500);

        /* 
            response includes {email: 'destinytestdev@gmail.com', first_name: 'Destiny', id: 4, verification_token: '712afc709ab67db9f74113435840343243422742e20893131d59f537ff734aa8', is_verified: false, …}
            */
      })
      .catch((err) => {
        console.log("registration error", err);
        const errorMessage = typeof err.response?.data.error === 'string' 
    ? err.response.data.error 
    : "An unexpected error occurred";
        setRegistrationError(errorMessage);
        setLoading(false);
      });
  }

  return (
    <form
      className="registration_form app-card flex-column"
      onSubmit={(event) => handleRegisterSubmit(event)}
    >
      <h2>Register</h2>
      <label>
        <input
          type="text"
          value={registerForm["first_name"]}
          id="first_name"
          onChange={(event) => handleFormInput(event)}
        />
        <span>First Name</span>
      </label>
      <label>
        <input
          type="text"
          value={registerForm["email"]}
          id="email"
          onChange={(event) => handleFormInput(event)}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          type="password"
          value={registerForm["password"]}
          id="password"
          onChange={(event) => handleFormInput(event)}
        />
        <span>Password</span>
      </label>

      <label>
        <input
          type="password"
          value={registerForm["confirm_password"]}
          id="confirm_password"
          onChange={(event) => handleFormInput(event)}
        />
        <span>Confirm Password</span>
      </label>

      <input type="submit" value="Register" disabled={loading} />

      {loading && <Loading />}
      {registrationError && (
        <span className="registration_form_error">{registrationError}</span>
      )}
    </form>
  );
}
