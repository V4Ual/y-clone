import { emailRegex } from "../regex";

export const onChangeLoginValidation = (name, value) => {
  let error = {};
  switch (name) {
    case "email":
      if (!value) {
        error.email = "Email is required";
      } else if (!emailRegex.test(value)) {
        error.email = "Please enter a valid email address.";
      } else {
        delete error.email;
      }
      break;
    case "password":
      if (!value) {
        error.password = "Password is required";
      } else {
        delete error.password;
      }
      break;
  }

  return error;
};

export const onSubmtiValidation = (authObject) => {
  const { email, password } = authObject;
  let error = {};

  if (!email) {
    error.email = "Email is required";
  } else if (emailRegex.test(email)) {
    error.email = "Email is required";
  }

  if (!password) {
    error.password = "Email is required";
  }

  return error;
};
