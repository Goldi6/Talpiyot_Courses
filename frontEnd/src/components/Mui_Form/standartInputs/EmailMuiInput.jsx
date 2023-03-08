import React from "react";
import MuiInput from "../MUIInput";
import validator from "validator";
import EmailIcon from "@mui/icons-material/Email";

export default function EmailMuiInput({
  setValue,
  setIsReady,
  isRequired = true,
  variant = "outlined",

  defaultValue = "",
  placeholder = "",
  icon = <EmailIcon />,
}) {
  const validators_email = [
    {
      func: (value) => validator.isEmail(value),
      message: "Please enter a valid email address",
    },
  ];

  return (
    <MuiInput
      setValue={setValue}
      setIsReady={setIsReady}
      name={"email"}
      type={"email"}
      label={"Email"}
      isRequired={isRequired}
      validators={validators_email}
      icon={icon}
      variant={variant}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
