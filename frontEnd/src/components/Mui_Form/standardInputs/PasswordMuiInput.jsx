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

PasswordMuiInput.defaultProps = {
  isRequired: true,
  variant: "outlined",
  minLength: 0,
  placeholder: "",
  passwordVerifyRepeat: false,
  icon: <PasswordIcon />,
  shrinkLabel: false,
  additionalValidators: [],
};

export default function PasswordMuiInput({ setValue, setIsReady, ...props }) {
  if (props.additionalValidators.length > 0)
    validators_password.push(...props.additionalValidators);

  if (props.minLength > 0)
    props.validators.push({
      func: (value) => value.length >= props.minLength,
      message: `Password must be at least ${props.minLength} characters`,
    });

  return (
    <MuiInput
      validators={validators_password}
      passwordVerifyRepeat={props.passwordVerifyRepeat}
      setValue={setValue}
      setIsReady={setIsReady}
      name={"password"}
      type={"password"}
      label={"Password"}
      isRequired={props.isRequired}
      icon={props.icon}
      variant={props.variant}
      placeholder={props.placeholder}
      shrinkLabel={props.shrinkLabel}
    />
  );
}
