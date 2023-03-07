import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "Context/userContext";
import { saveUserOnCookie } from "Cookies/cookies";
import { userUpdateAccount_Action } from "Reducers/Actions/UserActions";
import React, { useContext, useState } from "react";
import { updateProfile } from "server/profile";
import { isAtLeastAge } from "utils/calcAge";
import { getSimpleDate } from "utils/dates";
import validator from "validator";
import { convertToMuiDateFormat } from "../../utils/dates";

export default function Profile() {
  const { userDispatch, userData } = useContext(UserContext);

  const [invalidInput_message, setInvalidInput_message] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    general: "",
  });
  const [isValidInputs_array, setIsValidInputs_array] = useState({
    firstName: true,
    lastName: true,
    birthday: true,
    email: true,
  });

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [birthday, setBirthday] = useState(userData.birthday);
  const [email, setEmail] = useState(userData.email);
  // const [password, setPassword] = useState("");

  //TODO
  // const isSubmitDisabled = () => {
  //   const inputsNotEmpty = [firstName, lastName, email].every(
  //     (val) => val !== ""
  //   );
  //   const inputsAreValid = Object.values(isValidInputs_array).every(
  //     (val) => val
  //   );

  //   //console.log(!inputsNotEmpty && !inputsAreValid);
  //   //return !inputsNotEmpty || !inputsAreValid;
  //   return false;
  // };

  // const onBlurValidate_PasswordRepeatInput = (e) => {
  //   const comparePasswords = (repeatedPassword) => {
  //     return repeatedPassword === password;
  //   };

  //   const input = e.target;
  //   const inputValue = input.value.trim();
  //   const inputName = input.getAttribute("name");

  //   validateInput(
  //     inputValue,
  //     inputName,
  //     comparePasswords,
  //     "passwords don't match"
  //   );
  // };

  // const onBlurValidate_PasswordInput = (e) => {
  //   const verifyPassword = (passwordInput) => {
  //     const options = { min: 6, minSymbols: 0 };
  //     return (
  //       validator.isStrongPassword(passwordInput, options) ||
  //       passwordInput === ""
  //     );
  //   };

  //   const input = e.target;
  //   const inputValue = input.value.trim();
  //   const inputName = input.getAttribute("name");

  //   setPassword(
  //     validateInput(
  //       inputValue,
  //       inputName,
  //       verifyPassword,
  //       "password length must be at least 6 chars and contain lower and uppercase letters and a number",
  //       setInvalidInput_message,
  //       setIsValidInputs_array
  //     )
  //       ? inputValue
  //       : ""
  //   );
  // };
  const onBlurValidate_EmailInput = (e) => {
    const input = e.target;
    const inputValue = input.value.trim();
    const inputName = input.getAttribute("name");

    setEmail(
      validateInput(
        inputValue,
        inputName,
        validator.isEmail,
        "invalid Email format",
        setInvalidInput_message,
        setIsValidInputs_array
      )
        ? inputValue
        : ""
    );
  };

  const onBlurValidate_FirstNameInput = (e) => {
    const verifyUsername = (usernameInput) => {
      return !usernameInput.toLowerCase().includes("admin");
    };
    const input = e.target;
    const inputValue = input.value.trim();
    const inputName = input.getAttribute("name");

    setFirstName(
      validateInput(
        inputValue,
        inputName,
        verifyUsername,
        `name cannot include 'admin'`,
        setInvalidInput_message,
        setIsValidInputs_array
      )
        ? inputValue
        : ""
    );
  };
  const onBlurValidate_LastNameInput = (e) => {
    const verifyUsername = (usernameInput) => {
      return !usernameInput.toLowerCase().includes("admin");
    };
    const input = e.target;
    const inputValue = input.value.trim();
    const inputName = input.getAttribute("name");

    setLastName(
      validateInput(
        inputValue,
        inputName,
        verifyUsername,
        `name cannot include 'admin'`,
        setInvalidInput_message,
        setIsValidInputs_array
      )
        ? inputValue
        : ""
    );
  };

  const onBlurValidate_DateInput = (e) => {
    const minAge = 18;
    const verifyAge = (ageInput) => {
      return isAtLeastAge(ageInput, minAge);
    };

    const input = e.target;
    const inputValue = input.value.trim();
    const inputName = input.getAttribute("name");

    setBirthday(
      validateInput(
        inputValue,
        inputName,
        verifyAge,
        `allowed age is at least ${minAge}`,
        setInvalidInput_message,
        setIsValidInputs_array
      )
        ? inputValue
        : ""
    );
  };

  const validateInput = (
    inputValue,
    inputName,
    validateCallBack,
    invalidInputMessage,
    setterForMessages,
    setterForInputs
  ) => {
    const errorMessages = { ...invalidInput_message };
    const validInputsArray = { ...isValidInputs_array };

    let validatedResult = validator.isEmpty(inputValue);
    if (validatedResult) {
      errorMessages[inputName] = "Please enter " + inputName;
      validInputsArray[inputName] = false;
    } else {
      validatedResult = validateCallBack(inputValue);

      if (validatedResult) {
        validInputsArray[inputName] = true;
        errorMessages[inputName] = "";
      } else {
        errorMessages[inputName] = invalidInputMessage;
        validInputsArray[inputName] = false;
      }
    }

    setterForMessages(errorMessages);
    setterForInputs(validInputsArray);

    return validatedResult;
  };

  const inputs = [
    {
      type: "text",
      name: "firstName",
      validator: onBlurValidate_FirstNameInput,
      label: "First name",
    },
    {
      type: "text",
      name: "lastName",
      validator: onBlurValidate_LastNameInput,
      label: "Last name",
    },
    {
      type: "text",
      name: "email",
      label: "Email",

      validator: onBlurValidate_EmailInput,
    },
    {
      type: "date",
      name: "birthday",
      label: "Birthday",

      validator: onBlurValidate_DateInput,
    },
  ];

  const onSubmitForm = (e) => {
    e.preventDefault();
    const newData = {
      firstName,
      lastName,
      birthday,
      email,
    };

    const keys = Object.keys(newData);
    const user = {};
    for (const key of keys) {
      if (newData[key] !== "") {
        if (newData[key] !== userData[key]) {
          user[key] = newData[key];
        }
      }
    }

    updateProfile(user)
      .then((newData) => {
        userDispatch(userUpdateAccount_Action(newData));
        saveUserOnCookie(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      className="container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        style={{
          borderRight: "1px solid #333",
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <Typography variant="h3" style={{ paddingBottom: "2rem" }}>
          User Data
        </Typography>
        <Stack gap="1rem">
          <Typography>
            <b>first name:</b> {userData.user.firstName}
          </Typography>
          <Typography>
            <b>last name:</b> {userData.user.lastName}
          </Typography>
          <Typography>
            <b>email:</b> {userData.user.email}
          </Typography>
          <Typography>
            <b>Birth date:</b> {getSimpleDate(userData.user.birthday)}
          </Typography>
        </Stack>
      </Box>
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
          Edit Profile
        </Typography>
        {inputs.map((input) => {
          let placeholder = userData.user[input.name];
          let defaultValue = "";
          if (input.type === "date") {
            defaultValue = convertToMuiDateFormat(placeholder);
            placeholder = "";
          }

          return (
            <TextField
              key={input.name}
              onInput={input.validator}
              error={!isValidInputs_array[input.name]}
              type={input.type}
              label={input.label}
              variant="standard"
              helperText={invalidInput_message[input.name]}
              InputProps={{}}
              InputLabelProps={{ shrink: true }}
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
          );
        })}

        <Stack spacing={2} direction="row" sx={{ pb: 20 }}>
          <Button>Reset Password</Button>
          <Button
            variant="contained"
            type="submit"
            // disabled={isSubmitDisabled()}
          >
            Update
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
