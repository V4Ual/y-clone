export const onChangeHandleInputChannel = (name, value, file) => {
  const error = {};

  switch (name) {
    case "avatar":
      if (!value) {
        error.avatar = "No file selected.";
      } else {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024;
        if (!allowedTypes.includes(file.type)) {
          error.avatar = "Only JPG, PNG, or WEBP images are allowed.";
        } else if (value.size > maxSize) {
          error.avatar = "File size should be less than 2MB.";
        } else {
          delete error.avatar;
        }
      }
      break;

    case "channelName":
      if (!value) {
        error.channelName = "Channel name reuqired";
      } else {
        delete error.channelName;
      }

      break;
    case "description":
      if (!value) {
        error.description = "Description reuqired";
      } else {
        delete error.description;
      }
      break;
  }

  return error;
};

export const onSubmitChannel = (channelData) => {
  const { avatar, channelName, description } = channelData;

  const error = {};
  if (!avatar) {
    error.avatar = "No file selected.";
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(value.type)) {
      error.avatar = "Only JPG, PNG, or WEBP images are allowed.";
    } else if (value.size > maxSize) {
      error.avatar = "File size should be less than 2MB.";
    } else {
      delete error.avatar;
    }
  }

  if (!channelName) {
    error.channelName = "Channel required";
  } else {
    delete error.channelName;
  }

  if (!description) {
    error.description = "Channel required";
  } else {
    delete error.description;
  }

  return error;
};
