import config from "../config";

export const validateNickname = (nickname) => {
  if (
    nickname.length < config.nicknameMinLength ||
    nickname.length > config.nicknameMaxLength
  ) {
    return `Nickname should be between ${config.nicknameMinLength} and ${config.nicknameMaxLength} characters long.`;
  }
  if (nickname.includes(" ")) {
    return "Nickname should not contain spaces.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (
    password.length < config.passwordMinLength ||
    password.length > config.passwordMaxLength
  ) {
    return `Password should be between ${config.passwordMinLength} and ${config.passwordMaxLength} characters long.`;
  }
  if (password.includes(" ")) {
    return "Password should not contain spaces.";
  }
  return "";
};
