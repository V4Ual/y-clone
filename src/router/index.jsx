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
import VideoViewPage from "@pages/VideoViewPage";
import MainLayout from "../layout/MainLayout";
import VideoPlayer from "@components/VideoPlayer/VideoPlayer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute isPrivate={false} />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute isPrivate={true} />, // wraps protected children
    children: [
      { path: "home", element: <HomePage /> },
      { path: "upload", element: <VideoUpload /> },
      { path: "channel", element: <CreateChannelPage /> },
      { path: "channel-details", element: <ChannelPage /> },
      { path: "channel-123", element: <VideoPlayer /> },
      {
        path: "watch",
        element: (
          <MainLayout>
            <VideoViewPage />
          </MainLayout>
        ),
      },
    ],
  },
]);

export default router;
