import React from "react";
import MuiInput from "../MUIInput";
import validator from "validator";
import EmailIcon from "@mui/icons-material/Email";

let validators_email = [
  {
    func: (value) => validator.isEmail(value),
    message: "Please enter a valid email address",
  },
];

EmailMuiInput.defaultProps = {
  isRequired: true,
  variant: "outlined",
  label: "Email",
  defaultValue: "",
  placeholder: "",
  icon: <EmailIcon />,
  shrinkLabel: false,
  additionalValidators: [],
};

export default function EmailMuiInput({ setValue, setIsReady, ...props }) {
  const {
    isRequired,
    variant,
    label,
    defaultValue,
    placeholder,
    icon,
    shrinkLabel,
    additionalValidators,
  } = props;

  if (additionalValidators) {
    validators_email = [...validators_email, ...additionalValidators];
  }

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
