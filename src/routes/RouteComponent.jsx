import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Error from "../pages/Error.jsx";
import Verification from "../pages/Verification.jsx"
import Registration from "../pages/Registration.jsx"

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Registration />} />
           {/* VERIFICATION ROUTE */}
    <Route path="verification">
    <Route index element={<Verification />} />
    <Route path= ":verificationToken" element={<Verification />} />
      </Route> 
        <Route path="login" element={<Login />} />
      </Route>


     
      {/* ERROR ROUTES */}
      <Route path="/not-found" element={<Error />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
