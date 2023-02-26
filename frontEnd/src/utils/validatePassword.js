import validator from "validator";

export const verifyPassword = (passwordInput) => {
  const options = { min: 6, minSymbols: 0 };
  return validator.isStrongPassword(passwordInput, options);
};
