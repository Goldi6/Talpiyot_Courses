import React from "react";
import MuiInput from "../MUIInput";
import validator from "validator";
import EmailIcon from "@mui/icons-material/Email";

export default function EmailMuiInput({
  setValue,
  setIsReady,
  isRequired = true,
  variant = "outlined",
  label = "Email",
  defaultValue = "",
  placeholder = "",
  icon = <EmailIcon />,
  shrinkLabel = false,
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
      label={label}
      isRequired={isRequired}
      validators={validators_email}
      icon={icon}
      variant={variant}
      defaultValue={defaultValue}
      placeholder={placeholder}
      shrinkLabel={shrinkLabel}
    />
  );
}
