import { useState } from "react";
import { onChangeHandleInputChannel } from "../../validation/Channel.Validation";

export const useCreateChange = () => {
  const [createChangeData, setCreateChangeData] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleChangeInputChannel = (event) => {
    const { name, value } = event.target;
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
    const error = submitSignupValidation(registerData);
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
