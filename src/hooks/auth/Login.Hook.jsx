import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onChangeLoginValidation, onSubmtiValidation } from "../../validation";
import { fetchLogin } from "@services/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../../store/userSlice";

const useLoginHook = () => {
  const [authData, setAuthData] = useState({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
    const error = onChangeLoginValidation(name, value);
    if (Object.keys(error).length > 0) {
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
    const loginResponse = await fetchLogin(authData);

    if (loginResponse.status) {
      toast.success(loginResponse.message);
      localStorage.setItem("access_token", loginResponse.data.access_token);
      localStorage.setItem("userDetails", JSON.stringify(loginResponse.data));
      document.cookie = "refresh_token=" + loginResponse.data.refresh_token;
      navigation("/home");
    } else {
      toast.error(loginResponse.message);
    }
  };

  return { authData, handleChange, isLoading, errorMessage, handleLoginClick };
};

export { useLoginHook };
