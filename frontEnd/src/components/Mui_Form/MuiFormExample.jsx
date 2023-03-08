import React from "react";
import MuiInput from "./MUIInput";
import validator from "validator";
import { Button } from "@mui/material";
import EmailMuiInput from "./standartInputs/EmailMuiInput";
import DateMuiInput from "./standartInputs/DateMuiInput";
import PasswordMuiInput from "./standartInputs/PasswordMuiInput";

export default function MuiForm() {
  const [email, setEmail] = React.useState("");
  const [emailIsReady, setEmailIsReady] = React.useState(false);

  //

  const [firstName, setFirstName] = React.useState("");
  const [firstNameIsReady, setFirstNameIsReady] = React.useState(false);
  const validators_firstName = [
    {
      func: (value) => validator.isAlpha(value),
      message: "First name should contain only letters",
    },
  ];

  const [password, setPassword] = React.useState("");
  const [passwordIsReady, setPasswordIsReady] = React.useState(false);
  const validators_password = [
    {
      func: (value) => validator.isAlphanumeric(value),
      message: "Password should contain only letters and numbers",
    },
  ];

  const fields = [emailIsReady, firstNameIsReady, passwordIsReady];
  const isSubmitDisabled = () => {
    return !fields.every((field) => field);
  };

  return (
    <div>
      <form
        action=""
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <EmailMuiInput setValue={setEmail} setIsReady={setEmailIsReady} />
        <DateMuiInput />
        <MuiInput
          setValue={setFirstName}
          setIsReady={setFirstNameIsReady}
          name={"firstName"}
          label={"First name"}
          isRequired={true}
          validators={validators_firstName}
        />
        <PasswordMuiInput
          setValue={setPassword}
          setIsReady={setPasswordIsReady}
          passwordVerifyRepeat={true}
        />
      </form>
      <Button type="submit" disabled={isSubmitDisabled()}>
        submit
      </Button>
    </div>
  );
}
