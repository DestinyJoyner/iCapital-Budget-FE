import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import Loading from "../loading/Loading.jsx";
import PasswordInput from "../passwordInput/PasswordInput.jsx";
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
  const [passwordMatch, setPasswordMatch] = useState(false);

  // function for pattern match for password requirements
  function isValidPasswordRegex(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function handleFormInput(e) {
    const value = e.target.value;
    const id = e.target.id;
    setRegisterForm({ ...registerForm, [id]: value });
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    // trigger loading state
    setLoading(true);
    setRegistrationError(null);
    axios
      .post(`${API}/auth/register`, {
        login: registerForm,
      })
      .then(({ data }) => {
        // console.log("res registration", data);
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
        localStorage.setItem("icapital_user_first_name", first_name);

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
        const errorMessage = err.response?.data?.errors
          ? err.response.data.errors[0].msg
          : err.response?.data?.error
          ? err.response?.data?.error
          : "An unexpected error occurred";
        setRegistrationError(errorMessage);
        setLoading(false);
      });
  }

  useEffect(() => {
    const password1 = registerForm["password"];
    const password2 = registerForm["confirm_password"];
    const password1Valid = isValidPasswordRegex(password1);
    const password2Valid = isValidPasswordRegex(password2);

    const validPassword1 = password1 && password1Valid;
    const validPassword2 = password2 && password2Valid;

    if (validPassword1 && validPassword2) {
      if (password1 === password2) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    } else {
      setPasswordMatch(false);
    }
  }, [registerForm["password"], registerForm["confirm_password"]]);

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
          required
        />
        <span>First Name</span>
      </label>
      <label>
        <input
          type="text"
          value={registerForm["email"]}
          id="email"
          onChange={(event) => handleFormInput(event)}
          required
        />
        <span>Email</span>
      </label>

      <PasswordInput
        password={"password"}
        confirmPassword={"confirm_password"}
        stateVar={registerForm}
        setFunction={setRegisterForm}
        passwordMatch={passwordMatch}
        setPasswordMatch={setPasswordMatch}
      />

      {passwordMatch &&
        (loading ? (
          <Loading />
        ) : (
          <input type="submit" value="Register" disabled={loading} />
        ))}

      {registrationError && (
        <span className="registration_form_error">{registrationError}</span>
      )}
    </form>
  );
}
