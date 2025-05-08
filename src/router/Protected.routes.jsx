// src/routes/AuthRoute.jsx
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ isPrivate = false, children }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = Cookies.get("refresh_token");
    if (isPrivate && !token && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  if (!isPrivate && token) {
    return <Navigate to="/home" replace />;
  }

  if (children) return children;

  return <Outlet />;
};

export default ProtectRoute;
