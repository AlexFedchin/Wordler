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

export const validateWordListForm = (words) => {
  if (words.length < config.wordListMinLength) {
    return `There must be at least ${config.wordListMinLength} word pairs in the list.`;
  }

  for (const word of words) {
    if (
      !word.nativeWord.trim() ||
      !word.foreignWord.trim() ||
      word.foreignWord.startsWith(" ") ||
      word.nativeWord.startsWith(" ")
    ) {
      return "All word pairs must be filled and cannot contain only spaces or start with a space.";
    }
  }

  return "";
};

export const validateWordListTitle = (title) => {
  if (title === "") {
    return "Title cannot be empty.";
  }

  if ((!title.trim() && title !== "") || title.startsWith(" ")) {
    return "Title cannot contain only spaces or start with a space.";
  }

  if (title.length > config.wordListTitleMaxLength) {
    return `Title should be no more than ${config.wordListTitleMaxLength} characters long.`;
  }

  return "";
};

export const validateWordListLanguage = (language) => {
  if (language === "") {
    return "Language cannot be empty.";
  }

  if ((!language.trim() && language !== "") || language.startsWith(" ")) {
    return "Language cannot contain only spaces or start with a space.";
  }

  if (language.length > config.wordListLanguageMaxLength) {
    return `Language should be no more than ${config.wordListLanguageMaxLength} characters long.`;
  }

  return "";
};
