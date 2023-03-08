import React from "react";
import MuiInput from "../MUIInput";
import validator from "validator";

export default function AlphaMuiInput({
  setValue,
  setIsReady,
  label = "Text",
  isRequired = false,
  name = "text",
  variant = "outlined",
  defaultValue = "",
  placeholder = "",
  icon = undefined,
}) {
  const validators_alpha = [
    {
      func: (value) => validator.isAlpha(value),
      message: "Please enter only letters",
    },
  ];

  return (
    <MuiInput
      setValue={setValue}
      setIsReady={setIsReady}
      name={name}
      type={"text"}
      label={label}
      isRequired={isRequired}
      validators={validators_alpha}
      icon={icon}
      variant={variant}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}
