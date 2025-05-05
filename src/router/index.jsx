import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  LoginPage,
  CreateChannelPage,
  RegisterPage,
  HomePage,
  ChannelPage,
  VideoUpload,
} from "@pages/index";
import ProtectedRoute from "./Protected.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute isPrivate={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute isPrivate={false}>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute isPrivate={true} />, // wraps protected children
    children: [
      { path: "home", element: <HomePage /> },
      { path: "upload", element: <VideoUpload /> },
      { path: "channel", element: <CreateChannelPage /> },
      { path: "channel-details", element: <ChannelPage /> },
    ],
  },
]);

export default router;
