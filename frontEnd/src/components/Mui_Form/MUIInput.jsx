import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { convertToMuiDateFormat } from "utils/dates";
//NOTE!!!:when creating library add the convertToMui date function
//NOTE: the only state you define out of this field is the [readyToSubmit,setReadyToSubmit]

//NOTE: validators is an array of objects with the following properties: {func: function,message: string}:
export default function MuiInput({
  setValue,
  setIsReady,
  validators,
  name = "",
  label = "Text Input",
  isRequired = false,
  type = "text",
  icon = undefined,
  variant = "outlined",
  shrinkLabel = false,
  defaultValue = undefined,
  placeholder = "",
  passwordVerifyRepeat = false,
}) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //only for password match
  const [password, setPassword] = useState("");
  const [errorMessageMatch, setErrorMessageMatch] = useState("");

  if (type === "date" && defaultValue !== "") {
    defaultValue = convertToMuiDateFormat(defaultValue);
  }

  const onInput = (e) => {
    const val = e.target.value;
    if (val === "") {
      setIsError(false);
      setErrorMessage("");
      setValue("");
      if (isRequired) setIsReady(false);
      else setIsReady(true);

      return;
    }

    if (passwordVerifyRepeat) {
      let valid = true;
      for (const validator of validators) {
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
      for (const validator of validators) {
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
    } else if (passwordsMatch && !isRequired && password === "") {
      setIsReady(true);
      setValue("");
      setErrorMessageMatch("");
    } else if (passwordsMatch) {
      setIsReady(true);
      setValue(val);
      setErrorMessageMatch("");
      setErrorMessage("");
    }
  };

  const inputProps = icon
    ? {
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }
    : {};

  const inputLabelProps = shrinkLabel || icon ? { shrink: true } : {};
  const variantType =
    variant === "outlined"
      ? "outlined"
      : variant === "standard"
      ? "standard"
      : "filled";
  return (
    <>
      <TextField
        name={name}
        onInput={onInput}
        error={isError}
        type={type}
        label={label}
        variant={variantType}
        helperText={errorMessage}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        required={isRequired}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {passwordVerifyRepeat && (
        <TextField
          onInput={onInputPasswordsMatch}
          error={errorMessageMatch !== ""}
          type="password"
          label="Repeat password"
          variant={variantType}
          helperText={errorMessageMatch}
          InputProps={inputProps}
          InputLabelProps={inputLabelProps}
          required={isRequired}
        />
      )}
    </>
  );
}
