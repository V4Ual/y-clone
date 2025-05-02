import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateChannelPage from "../pages/CreateChannelPage";
import VideoUpload from "../pages/VideoUpload";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/channel",
    element: <CreateChannelPage />,
  },
  {
    path: "/upload",
    element: <VideoUpload />,
    opti
  },
]);

export default router;
