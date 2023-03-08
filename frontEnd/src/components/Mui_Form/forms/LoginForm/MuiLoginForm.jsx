import { Box, FormHelperText, Typography } from "@mui/material";
import React from "react";
import EmailMuiInput from "../../standardInputs/EmailMuiInput";
import PasswordMuiInput from "../../standardInputs/PasswordMuiInput";
import LoginFormButtons from "./LoginFormButtons";

export default function MuiLoginForm({
  loginFunc,
  generalErrorMessage,
  resetPasswordFunc,
}) {
  const [isLoginFormOpen, setIsLoginFormOpen] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailIsReady, setEmailIsReady] = React.useState(false);
  const [passwordIsReady, setPasswordIsReady] = React.useState(false);

  const isSubmitDisabled = () =>
    ![emailIsReady, passwordIsReady].every((x) => x);
  const isResetDisabled = () => !emailIsReady;
  //
  //
  const onSubmitLogin = (e) => {
    e.preventDefault();
    loginFunc(email, password);
  };

  const onSubmitResetPassword = (e) => {
    resetPasswordFunc(email);
  };
  //
  //

  return (
    <Box
      onSubmit={isLoginFormOpen ? onSubmitLogin : onSubmitResetPassword}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
      noValidate
      autoComplete="off"
    >
      {isLoginFormOpen ? (
        <Typography component="h1" variant="h5" sx={{ pb: 2 }}>
          Sign in
        </Typography>
      ) : (
        <Typography component="h1" variant="h5" sx={{ pb: 2 }}>
          Reset Password
        </Typography>
      )}
      {generalErrorMessage !== "" && (
        <FormHelperText error>{generalErrorMessage}</FormHelperText>
      )}

      <EmailMuiInput setValue={setEmail} setIsReady={setEmailIsReady} />
      {isLoginFormOpen && (
        <PasswordMuiInput
          setValue={setPassword}
          setIsReady={setPasswordIsReady}
          validators={[]}
        />
      )}

      <LoginFormButtons
        isSubmitDisabled={isSubmitDisabled}
        isResetDisabled={isResetDisabled}
        setIsLoginFormOpen={setIsLoginFormOpen}
        isLoginFormOpen={isLoginFormOpen}
      />
    </Box>
  );
}
