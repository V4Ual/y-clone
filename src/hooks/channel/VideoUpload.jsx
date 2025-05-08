import { fetchVideoUpload } from "@services/index";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useVideoUpload = () => {
  const [videoData, setVideoData] = useState({});

  const handleChangeInputUploadVideo = (e) => {
    const { name, value, files } = e.target;

    // if (!files || files.length === 0) return;
    let fileType = "";
    let file = "";

    if (files?.length > 0) {
      file = files[0] ?? "";
      fileType = file.type ?? "";
    }
    setVideoData((prev) => {
      const newData = { ...prev };
      if (fileType.startsWith("video/")) {
        newData.video = file;
      } else if (fileType.startsWith("image/")) {
        newData.image = file;
      } else {
        newData[name] = value;
      }

      return { ...newData };
    });
  };

  const hanldeDeleteThumbnail = (type) => {
    setVideoData((prev) => {
      const update = { ...prev };
      delete update[type];
      return update;
    });
  };

  const handleSubmitVideo = () => {
    const formData = new FormData();
    formData.append("video", videoData.video);
    formData.append("thumbnail", videoData.image);
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);

    const response = fetchVideoUpload(formData);

    if (response.status) {
      toast.success(response.message);
      setVideoData({});
    } else {
      toast.error(response.message);
    }
  };

  return {
    handleChangeInputUploadVideo,
    videoData,
    handleSubmitVideo,
    hanldeDeleteThumbnail,
  };
};
