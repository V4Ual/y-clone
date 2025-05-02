import { useEffect, useState } from "react";

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
    console.log(videoData);
  };

  return {
    handleChangeInputUploadVideo,
    videoData,
    handleSubmitVideo,
    hanldeDeleteThumbnail,
  };
};
