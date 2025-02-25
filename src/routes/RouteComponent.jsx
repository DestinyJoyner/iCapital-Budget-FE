import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import Error from "../pages/Error.jsx";
import Verification from "../pages/Verification.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import PasswordReset from "../pages/PasswordReset.jsx";
import Passcode from "../pages/Passcode.jsx";
import LandingPage from "../components/landingPage/LandingPage.jsx";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
      {/* LANDING PAGE */}
        <Route index element={<LandingPage />} />

        {/* LOGIN / REGISTRATION ROUTE */}
        <Route path="auth" element={<Auth />} />

        {/* VERIFICATION ROUTE */}
        <Route path="verification">
          <Route index element={<Verification />} />
          <Route path=":verificationToken" element={<Verification />} />
        </Route>

        {/* PASSWORD RESET ROUTE */}
        <Route path="password-reset">
          <Route index element={<PasswordReset />} />
          <Route path=":verificationToken" element={<PasswordReset />} />
        </Route>

        {/* PASSCODE ROUTE */}
        <Route path="passcode">
          <Route index element={<Passcode />} />
        </Route>

        <Route
          path="dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />

        {/* <Route path = "test" element ={<ProtectedRoute element ={Home} />} /> */}
      </Route>

      {/* ERROR ROUTES */}
      <Route path="/not-found" element={<Error />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
