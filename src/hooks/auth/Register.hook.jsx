import { useState } from "react";
import {
  onChangeSignupValidation,
  submitSignupValidation,
} from "../../validation/SingupValidation";

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
  const handleOnSubmit = (event) => {
    const error = submitSignupValidation(registerData);
    setErrorMessage(error);
    if (Object.keys(error).length > 0) {
      return;
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
