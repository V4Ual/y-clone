import { useState } from "react";
import { onChangeLoginValidation } from "../../validation";

const useLoginHook = () => {
  const [authData, setAuthData] = useState();
  const [loading, isLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAuthData((prev) => ({ ...prev, [name]: value }));

    const error = onChangeLoginValidation(name, value);
    console.log(error);
    if (Object.keys(error)) {
      setErrorMessage(error);
    }
  };

  return { authData, handleChange, isLoading, errorMessage };
};

export { useLoginHook };
