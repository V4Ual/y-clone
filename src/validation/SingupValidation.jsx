import { emailRegex } from "../regex";

export const onChangeSignupValidation = (name, value, password) => {
  const error = {};

  console.log(value, password);
  switch (name) {
    case "email":
      if (!value) {
        error.email = "Email is required";
      } else if (!emailRegex.test(value)) {
        error.email = "Invalid is email";
      } else {
        delete error.email;
      }
      break;

    case "password":
      if (!value) {
        error.password = "Password is requiredF";
      } else {
        delete error.password;
      }
      break;
    case "confirm-password":
      if (!value) {
        error.confirmPassword = "Password is requiredF";
      } else if (value !== password) {
        error.confirmPassword = "Password not match";
      } else {
        delete error.confirmPassword;
      }
      break;
  }

  return error;
};

export const submitSignupValidation = (signupOjbect) => {
  const { email, password, confirmPassword } = signupOjbect;
  const error = {};

  if (!email) {
    error.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    error.email = "Invalid email";
  }

  if (!password) {
    error.password = "Password is required";
  }

  if (!confirmPassword) {
    error.confirmPassword = "Confirm password is required";
  } else if (confirmPassword !== password) {
    error.confirmPassword = "Both password not match";
  }

  return error;
};
