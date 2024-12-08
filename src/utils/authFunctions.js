import axios from "axios";

function logOutUser(setUserFunction) {
  delete axios.defaults.headers.common["authorization"]
  localStorage.removeItem("token");
  localStorage.removeItem("icapital_user_email");
  localStorage.removeItem("icapital_user_first_name");
  setUserFunction({
    first_name: "",
    user_id: "",
    authToken: "",
    email: "",
  });
}

export { logOutUser };
