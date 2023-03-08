import { Button, Stack } from "@mui/material";
import React from "react";

export default function LoginFormButtons({
  setIsLoginFormOpen,
  isLoginFormOpen,
  isSubmitDisabled,
  isResetDisabled,
}) {
  const onClickShowPasswordResetForm = (e) => {
    e.preventDefault();
    setIsLoginFormOpen(false);
  };
  const onClickShowLoginForm = (e) => {
    e.preventDefault();
    setIsLoginFormOpen(true);
  };

  return (
    <Stack spacing={2} direction="row" sx={{ pb: 20 }}>
      {isLoginFormOpen ? (
        <Button
          variant="text"
          size="small"
          onClick={onClickShowPasswordResetForm}
        >
          Forgot password
        </Button>
      ) : (
        <Button variant="text" size="small" onClick={onClickShowLoginForm}>
          Back
        </Button>
      )}
      {isLoginFormOpen ? (
        <Button variant="contained" type="submit" disabled={isSubmitDisabled()}>
          Login
        </Button>
      ) : (
        <Button variant="contained" type="submit" disabled={isResetDisabled()}>
          Reset Password
        </Button>
      )}
    </Stack>
  );
}
