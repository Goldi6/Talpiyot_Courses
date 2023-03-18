import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import AlphaMuiInput from "components/Mui_Form/standardInputs/AlphaMuiInput";
import DateMuiInput from "components/Mui_Form/standardInputs/DateMuiInput";
import EmailMuiInput from "components/Mui_Form/standardInputs/EmailMuiInput";
import React, { useState } from "react";
import { ageValidation, nameValidation } from "../extraValidation";
import { formReset } from "../utils";
import RoleRadioGroup from "./roleRadioGroup";

export default function MuiCreateUserForm({ errorMessage, createUserFunc }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthday, setBirthday] = React.useState("");

  const [isReadyFirstName, setIsReadyFirstName] = React.useState(false);
  const [isReadyLastName, setIsReadyLastName] = React.useState(false);
  const [isReadyEmail, setIsReadyEmail] = React.useState(false);
  const [isReadyBirthday, setIsReadyBirthday] = React.useState(false);

  const [role, setRole] = useState("student");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!(isReadyEmail && isReadyFirstName && isReadyLastName)) return;

    const data = { firstName, lastName, email, role };
    if (isReadyBirthday) data.birthday = birthday;

    const toReset = await createUserFunc(data);

    if (toReset)
      formReset(
        e.target,
        [setFirstName, setLastName, setEmail, setBirthday],
        [
          setIsReadyBirthday,
          setIsReadyFirstName,
          setIsReadyLastName,
          setIsReadyEmail,
        ]
      );
  };

  const [birthdayInputValue, setBirthdayInputValue] = React.useState("");
  const isSubmitDisabled = () => {
    const areRequiredFieldsReady = [
      isReadyFirstName,
      isReadyLastName,
      isReadyEmail,
    ].every((isReady) => isReady);
    if (!areRequiredFieldsReady) return true;

    if (isReadyBirthday && birthdayInputValue !== "") return true;

    return false;
  };

  return (
    <Box
      className="flex-half"
      onSubmit={onSubmitForm}
      component="form"
      autoComplete="off"
    >
      <Stack spacing={3}>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>

        <Stack spacing={2} direction="column">
          <AlphaMuiInput
            label={"First name"}
            setValue={setFirstName}
            setIsReady={setIsReadyFirstName}
            additionalValidation={[nameValidation]}
            isRequired={true}
          />
          <AlphaMuiInput
            label={"Last name"}
            setValue={setLastName}
            setIsReady={setIsReadyLastName}
            additionalValidation={[nameValidation]}
            isRequired={true}
          />
          <EmailMuiInput
            label={"New Email"}
            setValue={setEmail}
            setIsReady={setIsReadyEmail}
            isRequired={true}
          />
          <DateMuiInput
            label="Birthday"
            setValue={setBirthday}
            setIsReady={setIsReadyBirthday}
            additionalValidation={[ageValidation]}
            setInputValue={setBirthdayInputValue}
            isRequired={false}
          />
        </Stack>
        {errorMessage !== "" && (
          <FormHelperText error>{errorMessage}</FormHelperText>
        )}

        <Button
          variant="contained"
          type="submit"
          color="secondary"
          disabled={isSubmitDisabled()}
        >
          Create User
        </Button>
        <RoleRadioGroup setValue={setRole} value={role} />
      </Stack>
    </Box>
  );
}
