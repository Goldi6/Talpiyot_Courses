import React from "react";
import MuiInput from "../MUIInput";

export default function DateMuiInput({ setValue, setIsReady, ...props }) {
  let validators_date = [
    {
      func: (value) => {
        value = new Date(value["$d"]);
        if (props.min && value < props.min) return false;
        if (props.max && value > props.max) return false;
        return true;
      },
      message: `date must be between ${props.min} and ${props.max}`,
    },
  ];

  if (props.additionalValidators.length > 0) {
    validators_date = [...validators_date, ...props.additionalValidators];
  }
  return (
    <MuiInput
      label={props.label}
      setValue={setValue}
      setIsReady={setIsReady}
      name={props.name}
      type={"date"}
      isRequired={props.isRequired}
      validators={validators_date}
      variant={props.variant}
      shrinkLabel={props.shrinkLabel}
      defaultValue={props.defaultValue}
    />
  );
}

DateMuiInput.defaultProps = {
  label: "Date",
  name: "date",
  min: null,
  max: null,
  isRequired: true,
  variant: "outlined",
  shrinkLabel: true,
  additionalValidators: [],
};
