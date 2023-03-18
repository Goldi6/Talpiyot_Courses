import React from "react";
import AlphaMuiInput from "../../standardInputs/AlphaMuiInput";
import EmailMuiInput from "components/Mui_Form/standardInputs/EmailMuiInput";
import DateMuiInput from "components/Mui_Form/standardInputs/DateMuiInput";
import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { formReset } from "../utils";
import { ageValidation, nameValidation } from "../extraValidation";

export default function MuiUpdateProfileForm({
  userData,
  updateFunc,
  variant = "standard",
  shrinkLabel = true,
  errorMessage,
}) {
  const generalProps = { shrinkLabel, variant, isRequired: false };

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthday, setBirthday] = React.useState("");

  const [isReadyFirstName, setIsReadyFirstName] = React.useState(false);
  const [isReadyLastName, setIsReadyLastName] = React.useState(false);
  const [isReadyEmail, setIsReadyEmail] = React.useState(false);
  const [isReadyBirthday, setIsReadyBirthday] = React.useState(false);

  const submitIsDisabled = () => {
    return !(
      (isReadyFirstName && firstName !== userData.firstName) ||
      (isReadyLastName && lastName !== userData.lastName) ||
      (isReadyEmail && email !== userData.email) ||
      (isReadyBirthday && birthday !== userData.birthday)
    );
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    let data = {};
    if (isReadyBirthday) data = { ...data, birthday };
    if (isReadyFirstName) data = { ...data, firstName };
    if (isReadyLastName) data = { ...data, lastName };
    if (isReadyEmail) data = { ...data, email };

    updateFunc(data).then((toReset) => {
      if (toReset)
        formReset(
          e.target,
          [setFirstName, setLastName, setBirthday, setEmail],
          [
            setIsReadyFirstName,
            setIsReadyBirthday,
            setIsReadyLastName,
            setIsReadyEmail,
          ]
        );
    });
  };

  return (
    <Box
      onSubmit={onSubmitUpdate}
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
        Update Profile
      </Typography>
      <Stack>
        <AlphaMuiInput
          placeholder={userData.firstName}
          label={"First name"}
          setValue={setFirstName}
          setIsReady={setIsReadyFirstName}
          additionalValidation={[nameValidation]}
          {...generalProps}
        />
        <AlphaMuiInput
          placeholder={userData.lastName}
          label={"Last name"}
          setValue={setLastName}
          setIsReady={setIsReadyLastName}
          additionalValidation={[nameValidation]}
          {...generalProps}
        />
        <EmailMuiInput
          placeholder={userData.email}
          label={"New Email"}
          setValue={setEmail}
          setIsReady={setIsReadyEmail}
          {...generalProps}
        />
        <DateMuiInput
          defaultValue={userData.birthday}
          label="Birthday"
          setValue={setBirthday}
          setIsReady={setIsReadyBirthday}
          additionalValidation={[ageValidation]}
          {...generalProps}
        />
      </Stack>
      {errorMessage !== "" && (
        <FormHelperText error>{errorMessage}</FormHelperText>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={submitIsDisabled()}
      >
        Update
      </Button>
    </Box>
  );
}
