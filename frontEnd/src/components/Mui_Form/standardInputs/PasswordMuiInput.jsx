import React from "react";
import MuiInput from "../MUIInput";
import validator from "validator";
import PasswordIcon from "@mui/icons-material/Password";

const validators_password = [
  {
    func: (value) => validator.isAlphanumeric(value),
    message: "Password must be alphanumeric",
  },
];

export default function PasswordMuiInput({
  validators = validators_password,
  setValue,
  setIsReady,
  isRequired = true,
  variant = "outlined",
  minLength = 0,
  placeholder = "",
  passwordVerifyRepeat = false,
  icon = <PasswordIcon />,
  shrinkLabel = false,
}) {
  if (minLength > 0)
    validators.push({
      func: (value) => value.length >= minLength,
      message: `Password must be at least ${minLength} characters`,
    });

  return (
    <MuiInput
      validators={validators}
      passwordVerifyRepeat={passwordVerifyRepeat}
      setValue={setValue}
      setIsReady={setIsReady}
      name={"password"}
      type={"password"}
      label={"Password"}
      isRequired={isRequired}
      icon={icon}
      variant={variant}
      placeholder={placeholder}
      shrinkLabel={shrinkLabel}
    />
  );
}
