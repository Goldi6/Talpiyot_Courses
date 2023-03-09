import React from "react";
import AlphaMuiInput from "../../standardInputs/AlphaMuiInput";
import EmailMuiInput from "components/Mui_Form/standardInputs/EmailMuiInput";
import DateMuiInput from "components/Mui_Form/standardInputs/DateMuiInput";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { isAtLeastAge } from "utils/calcAge";

export default function MuiUpdateProfileForm({
  userData,
  variant = "standard",
  shrinkLabel = true,
  updateFunc,
  errorMessage,
}) {
  const [firstName, setFirstName] = React.useState(userData.firstName);
  const [lastName, setLastName] = React.useState(userData.lastName);
  const [email, setEmail] = React.useState(userData.email);
  const [birthday, setBirthday] = React.useState(userData.birthday);

  const [isReadyFirstName, setIsReadyFirstName] = React.useState(false);
  const [isReadyLastName, setIsReadyLastName] = React.useState(false);
  const [isReadyEmail, setIsReadyEmail] = React.useState(false);
  const [isReadyBirthday, setIsReadyBirthday] = React.useState(false);

  const submitIsDisabled = () => {
    return !(
      isReadyFirstName ||
      isReadyLastName ||
      isReadyEmail ||
      isReadyBirthday
    );
  };
  const reset = (form) => {
    setFirstName("");
    setLastName("");
    setBirthday("");
    setEmail("");

    form.reset();
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    let data = {};
    if (isReadyBirthday) data = { ...data, birthday };
    if (isReadyFirstName) data = { ...data, firstName };
    if (isReadyLastName) data = { ...data, lastName };
    if (isReadyEmail) data = { ...data, email };

    updateFunc(data);
  };

  const ageValidation = {
      func: (val) => {
        return isAtLeastAge(val, 18);
      },
      message: "You must be at least 18 years old to update your profile.",
    },
    nameValidation = {
      func: (value) => !value.includes("admin"),
      message: "came cannot include admin",
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
      <AlphaMuiInput
        variant={variant}
        placeholder={userData.firstName}
        label={"First name"}
        setValue={setFirstName}
        setIsReady={setIsReadyFirstName}
        shrinkLabel={shrinkLabel}
        isRequired={false}
        additionalValidation={[nameValidation]}
      />
      <AlphaMuiInput
        variant={variant}
        placeholder={userData.lastName}
        label={"Last name"}
        setValue={setLastName}
        setIsReady={setIsReadyLastName}
        shrinkLabel={shrinkLabel}
        isRequired={false}
        additionalValidation={[nameValidation]}
      />
      <EmailMuiInput
        variant={variant}
        placeholder={userData.email}
        label={"New Email"}
        setValue={setEmail}
        setIsReady={setIsReadyEmail}
        shrinkLabel={shrinkLabel}
        isRequired={false}
      />
      <DateMuiInput
        isRequired={false}
        variant={variant}
        defaultValue={userData.birthday}
        label="Birthday"
        setValue={setBirthday}
        setIsReady={setIsReadyBirthday}
        shrinkLabel={shrinkLabel}
        additionalValidation={[ageValidation]}
      />
      {errorMessage !== "" && (
        <FormHelperText error>{errorMessage}</FormHelperText>
      )}
      <Button type="submit" disabled={submitIsDisabled()}>
        Update
      </Button>
    </Box>
  );
}
