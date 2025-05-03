import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onChangeLoginValidation, onSubmtiValidation } from "../../validation";
import { fetchLogin } from "@services/index";
import { toast } from "react-toastify";

const useLoginHook = () => {
  const [authData, setAuthData] = useState({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigation = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
    const error = onChangeLoginValidation(name, value);
    console.log(error);
    if (Object.keys(error)) {
      setErrorMessage(error);
    }
  };

  const handleLoginClick = async () => {
    const error = onSubmtiValidation(authData);

    setErrorMessage(error);
    if (Object.keys(error).length > 0) {
      return;
    }

    setIsLoading(true);
    const loginReponse = await fetchLogin(authData);

    if (loginReponse.status) {
      toast.success(loginReponse.message);
      localStorage.setItem("access_token", loginReponse.data);
      navigation("/home");
    } else {
      toast.error(loginReponse.message);
    }
  };

  return { authData, handleChange, isLoading, errorMessage, handleLoginClick };
};

export { useLoginHook };
