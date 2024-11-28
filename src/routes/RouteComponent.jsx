import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Error from "../pages/Error.jsx";

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* ERROR ROUTES */}
      <Route path="/not-found" element={<Error />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
