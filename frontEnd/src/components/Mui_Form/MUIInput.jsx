import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { convertToMuiDateFormat } from "utils/dates";
//NOTE: the only state you define out of this field is the [readyToSubmit,setReadyToSubmit]

//NOTE: validators is an array of objects with the following properties: {func: function,message: string}:

MuiInput.defaultProps = {
  name: "",
  label: "",
  isRequired: false,
  type: "text",
  placeholder: "",

  icon: undefined,
  variant: "outlined",
  shrinkLabel: false,

  passwordVerifyRepeat: false,

  validators: [],
  defaultValue: undefined,
  setInputValue: undefined,
};

export default function MuiInput({ setValue, setIsReady, ...props }) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //used only double password field
  const [password, setPassword] = useState("");
  const [errorMessageMatch, setErrorMessageMatch] = useState("");

  let defaultValue = props.defaultValue;
  if (props.type === "date" && defaultValue !== "") {
    defaultValue = convertToMuiDateFormat(defaultValue || new Date());
  }

  const onInput = (e) => {
    const val = e.target.value;
    if (props.setInputValue) props.setInputValue(val);

    if (val === "") {
      setIsError(false);
      setErrorMessage("");
      setValue("");
      setIsReady(false);

      return;
    }

    if (props.passwordVerifyRepeat) {
      let valid = true;
      for (const validator of props.validators) {
        if (validator.func(val)) continue;
        valid = false;
        setIsError(true);
        setErrorMessage(validator.message);
        setIsReady(false);
        setPassword("");
        break;
      }
      if (!valid) return;

      setIsError(false);
      setErrorMessage("");

      setPassword(val);
    } else {
      let valid = true;
      for (const validator of props.validators) {
        if (validator.func(val)) continue;
        valid = false;
        setIsError(true);
        setErrorMessage(validator.message);
        setIsReady(false);
        setValue("");
        break;
      }

      if (!valid) return;

      setIsError(false);
      setErrorMessage("");
      setIsReady(true);
      setValue(val);
    }
  };

  const onInputPasswordsMatch = (e) => {
    const val = e.target.value;
    const passwordsMatch = val === password;
    if (!passwordsMatch && password !== "") {
      setIsReady(false);
      setValue("");
      if (val !== "") {
        setErrorMessageMatch("passwords don't match");
      } else {
        setErrorMessageMatch("");
      }
    } else if (passwordsMatch && password === "") {
      setIsReady(false);
      setValue("");
      setErrorMessageMatch("");
    } else if (passwordsMatch) {
      setIsReady(true);
      setValue(val);
      setErrorMessageMatch("");
      setErrorMessage("");
    }
  };

  const inputProps = props.icon
    ? {
        startAdornment: (
          <InputAdornment position="start">{props.icon}</InputAdornment>
        ),
      }
    : {};

  const inputLabelProps =
    props.shrinkLabel || props.icon ? { shrink: true } : {};
  const variantType =
    props.variant === "outlined"
      ? "outlined"
      : props.variant === "standard"
      ? "standard"
      : "filled";

  return (
    <>
      <TextField
        onInput={onInput}
        error={isError}
        name={props.name}
        type={props.type}
        label={props.label}
        variant={variantType}
        helperText={errorMessage}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        required={props.isRequired}
        defaultValue={defaultValue}
        placeholder={props.placeholder}
      />
      {props.passwordVerifyRepeat && (
        <TextField
          onInput={onInputPasswordsMatch}
          error={errorMessageMatch !== ""}
          type="password"
          label="Repeat password"
          variant={variantType}
          helperText={errorMessageMatch}
          InputProps={inputProps}
          InputLabelProps={inputLabelProps}
          required={props.isRequired}
        />
      )}
    </>
  );
}
