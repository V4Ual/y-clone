import { useState } from "react";
import {
  onChangeHandleInputChannel,
  onSubmitChannel,
} from "../../validation/Channel.Validation";
import { toast } from "react-toastify";
import { fetchChannelCreate } from "@services/index";
import { useNavigate } from "react-router-dom";

export const useCreateChange = () => {
  const navigation = useNavigate();
  const [createChangeData, setCreateChangeData] = useState({
    channelName: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleChangeInputChannel = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      let imageSize = 2 * 1024 * 1024;
      if (event?.target?.files[0]?.size > imageSize) {
        return toast.warn("File size should be less than 2MB.");
      }
    }
    const error = onChangeHandleInputChannel(
      name,
      value,
      name === "avatar" ? event.target.files[0] : ""
    );
    setErrorMessage(error);
    setCreateChangeData((prev) => {
      if (name === "avatar") {
        return { ...prev, avatar: event.target.files[0] };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  const handleOnSubmitChannel = async () => {
    const error = onSubmitChannel(createChangeData);

    setErrorMessage(error);
    if (Object.keys(error).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", createChangeData.avatar);
    formData.append("channelName", createChangeData.channelName);
    formData.append("description", createChangeData.description);
    const responseChannel = await fetchChannelCreate(formData);
    if (responseChannel.status) {
      localStorage.setItem("userDetails", JSON.stringify(responseChannel.data));
      toast.success(responseChannel.message);
      navigation("/upload");
    } else {
      toast.error(responseChannel.message);
    }
  };

  return {
    createChangeData,
    handleChangeInputChannel,
    handleOnSubmitChannel,
    isLoading,
    avatar,
    errorMessage,
  };
};
