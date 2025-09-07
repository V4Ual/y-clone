import { useState } from "react";
import {
  onChangeSignupValidation,
  submitSignupValidation,
} from "../../validation/SingupValidation";
import { fetchUserRegister } from "@services/index";
import { toast } from "react-toastify";

export const useRegistrationHook = () => {
  const [registerData, setRegisterData] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    const error = onChangeSignupValidation(name, value, registerData?.password);
    setErrorMessage(error);

    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnSubmit = async (event) => {
    const error = submitSignupValidation(registerData);
    setErrorMessage(error);
    if (Object.keys(error).length > 0) {
      return;
    }

    const response = await fetchUserRegister(registerData);

    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return {
    registerData,
    errorMessage,
    handleChangeInput,
    isLoading,
    handleOnSubmit,
  };
};
