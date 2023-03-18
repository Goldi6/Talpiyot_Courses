import React from "react";
import MuiInput from "../MUIInput";
import validator from "validator";

let validators_alpha = [
  {
    func: (value) => validator.isAlpha(value),
    message: "Please enter only letters",
  },
  {
    func: (value) => value.length > 1,
    message: "Please enter at least 2 characters",
  },
];

AlphaMuiInput.defaultProps = {
  label: "Text",
  isRequired: false,
  name: "text",
  variant: "outlined",
  defaultValue: "",
  placeholder: "",
  icon: undefined,
  shrinkLabel: false,
  additionalValidators: [],
};

export default function AlphaMuiInput({ setValue, setIsReady, ...props }) {
  if (props.additionalValidators.length > 0)
    validators_alpha = [...validators_alpha, ...props.additionalValidators];
  return (
    <MuiInput
      setValue={setValue}
      setIsReady={setIsReady}
      name={props.name}
      type={"text"}
      label={props.label}
      isRequired={props.isRequired}
      validators={validators_alpha}
      icon={props.icon}
      variant={props.variant}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      shrinkLabel={props.shrinkLabel}
    />
  );
}
