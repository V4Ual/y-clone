// src/routes/AuthRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ isPrivate = false, children }) => {
  const token = localStorage.getItem("access_token");
  
  console.log(isPrivate,!token)

  if (isPrivate && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!isPrivate && token) {
    return <Navigate to="/home" replace />;
  }

  if (children) return children;

  return <Outlet />;
};

export default ProtectRoute;
