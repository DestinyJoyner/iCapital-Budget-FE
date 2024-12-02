import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import Loading from "../loading/Loading.jsx";
import { logOutUser } from "../../utils/authFunctions.js";
import "./LogOutButton.scss";

export default function LogOutButton() {
  const { setUserAuth } = useAuthProvider();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function userLogOut() {
    setLoading(true);

    try {
      await logOutUser(setUserAuth);
      setTimeout(() => {
        navigate("/auth");
        setLoading(false);
      }, 500);
    } catch (err) {
      console.log("logout error", err);
      setLoading(false);
    }
  }
  return (
    <button className="logoutButton"
    disabled={loading} onClick={() => userLogOut()}>
     Log Out
    </button>
  );
}
