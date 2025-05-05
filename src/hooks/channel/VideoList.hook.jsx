import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useVideoList = () => {
  const [videoHistory, setVideoHistory] = useState([
    {
      id: "1",
      title: "Getting Started with React",
      description: "Learn the basics of React in this tutorial",
      thumbnail:
        "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fileName: "react-basics.mp4",
      uploadDate: new Date(2023, 10, 15),
      status: "live",
      views: 1245,
    },
    {
      id: "2",
      title: "Advanced CSS Techniques",
      description: "Master advanced CSS techniques for modern web development",
      thumbnail:
        "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fileName: "advanced-css.mp4",
      uploadDate: new Date(2023, 11, 2),
      status: "processing",
      views: 0,
    },
    {
      id: "3",
      title: "JavaScript Performance Tips",
      description: "Optimize your JavaScript code with these performance tips",
      thumbnail:
        "https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      fileName: "js-performance.mp4",
      uploadDate: new Date(2023, 9, 28),
      status: "failed",
      views: 0,
    },
  ]);
  const navigation = useNavigate();

  const userDetails = useSelector((state) => state.user);

  const createChannel = () => {
    if (userDetails.is_channel) {
      navigation("/channel-details");
    } else {
      navigation("/channel");
    }
  };

  return {
    videoHistory,
    createChannel,
  };
};
