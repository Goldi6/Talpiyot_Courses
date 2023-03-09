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
  shrinkLabel = false,
}) {
  const validators_alpha = [
    {
      func: (value) => validator.isAlpha(value),
      message: "Please enter only letters",
    },
    {
      func: (value) => !value.includes("admin"),
      message: "came cannot include admin",
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
      shrinkLabel={shrinkLabel}
    />
  );
}
