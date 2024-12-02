import axios from "axios";

function logOutUser(setUserFunction) {
  delete axios.defaults.headers.common["authorization"]
  localStorage.removeItem("token");
  localStorage.removeItem("icapital_user_email");
  setUserFunction({
    first_name: "",
    user_id: "",
    authToken: "",
    email: "",
  });
}

export { logOutUser };
