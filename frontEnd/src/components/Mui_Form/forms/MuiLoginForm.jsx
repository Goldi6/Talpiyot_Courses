import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import React from "react";
import EmailMuiInput from "../standartInputs/EmailMuiInput";
import PasswordMuiInput from "../standartInputs/PasswordMuiInput";

export default function MuiLoginForm({ loginFunc, generalErrorMessage }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailIsReady, setEmailIsReady] = React.useState(false);
  const [passwordIsReady, setPasswordIsReady] = React.useState(false);

  const allInputs = [emailIsReady, passwordIsReady];

  const isSubmitDisabled = () => !allInputs.every((x) => x);

  const onSubmitForm = (e) => {
    e.preventDefault();
    loginFunc(email, password);
  };

  return (
    <Box
      onSubmit={onSubmitForm}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography component="h1" variant="h5" sx={{ pb: 2 }}>
        Sign in
      </Typography>
      {generalErrorMessage !== "" && (
        <FormHelperText error>{generalErrorMessage}</FormHelperText>
      )}

      <EmailMuiInput setValue={setEmail} setIsReady={setEmailIsReady} />
      <PasswordMuiInput
        setValue={setPassword}
        setIsReady={setPasswordIsReady}
        validators={[]}
      />

      <Stack spacing={2} direction="row" sx={{ pb: 20 }}>
        <Button variant="text" size="small">
          Forgot password
        </Button>
        <Button variant="contained" type="submit" disabled={isSubmitDisabled()}>
          Login
        </Button>
      </Stack>
    </Box>
  );
}
