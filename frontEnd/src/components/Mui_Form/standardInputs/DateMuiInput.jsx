import React from "react";
import MuiInput from "../MUIInput";

export default function DateMuiInput(
  setValue,
  setValueIsReady,
  label = "Date",
  name = "date",
  min = null,
  max = null,
  isRequired = true,
  variant = "outlined",
  shrinkLabel = true,
  defaultValue = new Date()
) {
  const validators_date = [
    {
      func: (value) => {
        value = new Date(value["$d"]);
        if (min && value < min) return false;
        if (max && value > max) return false;
        return true;
      },
      message: `date must be between ${min} and ${max}`,
    },
  ];

  return (
    <MuiInput
      label={label}
      setValue={setValue}
      setIsReady={setValueIsReady}
      name={name}
      type={"date"}
      isRequired={isRequired}
      validators={validators_date}
      variant={variant}
      shrinkLabel={shrinkLabel}
      defaultValue={defaultValue}
    />
  );
}
