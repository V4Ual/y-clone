import { useState } from "react";
import {
  onChangeHandleInputChannel,
  onSubmitChannel,
} from "../../validation/Channel.Validation";
import { toast } from "react-toastify";
 
export const useCreateChange = () => {
  const [createChangeData, setCreateChangeData] = useState({
    channelName: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleChangeInputChannel = (event) => {
    const { name, value } = event.target;

    let imageSize = 2 * 1024;
    if (event.target.files[0].size > imageSize) {
      return toast.warn("File size should be less than 2MB.");
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
  const handleOnSubmitChennal = () => {
    const error = onSubmitChannel(createChangeData);

    setErrorMessage(error);
    if (Object.keys(error).length > 0) {
      return;
    }
  };

  return {
    createChangeData,
    handleChangeInputChannel,
    handleOnSubmitChennal,
    isLoading,
    avatar,
    errorMessage,
  };
};
