import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx"
import Error from "../pages/Error.jsx";
import Verification from "../pages/Verification.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"
import Dashboard from "../pages/Dashboard.jsx"

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />

         {/* LOGIN / REGISTRATION ROUTE */}
         <Route path="auth" element={<Auth />} />
        
        {/* VERIFICATION ROUTE */}
        <Route path="verification">
          <Route index element={<Verification />} />
          <Route path=":verificationToken" element={<Verification />} />
        </Route>

        <Route path = "dashboard" element ={<ProtectedRoute element ={Dashboard} />} />
       

        <Route path = "test" element ={<ProtectedRoute element ={Home} />} />
      </Route>

      {/* ERROR ROUTES */}
      <Route path="/not-found" element={<Error />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
