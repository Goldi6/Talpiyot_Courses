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
import { updateUser } from "server/auth";
import { isAtLeastAge } from "utils/calcAge";
import validator from "validator";

export default function Profile() {
  const { userDispatch, userData } = useContext(UserContext);

  const [invalidInput_message, setInvalidInput_message] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    passwordRepeat: "",
    general: "",
  });
  const [isValidInputs_array, setIsValidInputs_array] = useState({
    firstName: true,
    lastName: true,
    birthday: true,
    email: true,
    password: true,
    passwordRepeat: true,
  });

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [birthday, setBirthday] = useState(userData.birthday);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");

  //TODO
  const isSubmitDisabled = () => {
    const inputsNotEmpty = [firstName, lastName, email].every(
      (val) => val !== ""
    );
    const inputsAreValid = Object.values(isValidInputs_array).every(
      (val) => val
    );

    //console.log(!inputsNotEmpty && !inputsAreValid);
    //return !inputsNotEmpty || !inputsAreValid;
    return false;
  };

  const onBlurValidate_PasswordRepeatInput = (e) => {
    const comparePasswords = (repeatedPassword) => {
      return repeatedPassword === password;
    };

    const input = e.target;
    const inputValue = input.value.trim();
    const inputName = input.getAttribute("name");

    validateInput(
      inputValue,
      inputName,
      comparePasswords,
      "passwords don't match"
    );
  };

  const onBlurValidate_PasswordInput = (e) => {
    const verifyPassword = (passwordInput) => {
      const options = { min: 6, minSymbols: 0 };
      return (
        validator.isStrongPassword(passwordInput, options) ||
        passwordInput === ""
      );
    };

    const input = e.target;
    const inputValue = input.value.trim();
    const inputName = input.getAttribute("name");

    setPassword(
      validateInput(
        inputValue,
        inputName,
        verifyPassword,
        "password length must be at least 6 chars and contain lower and uppercase letters and a number",
        setInvalidInput_message,
        setIsValidInputs_array
      )
        ? inputValue
        : ""
    );
  };
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
      placeholder: "Please enter your name",
      validator: onBlurValidate_FirstNameInput,
    },
    {
      type: "text",
      name: "lastName",
      placeholder: "Please enter your last name",
      validator: onBlurValidate_LastNameInput,
    },
    {
      type: "text",
      name: "email",
      placeholder: "Please enter your email",
      validator: onBlurValidate_EmailInput,
    },
    {
      type: "date",
      name: "birthday",
      placeholder: "Please enter your age",
      validator: onBlurValidate_DateInput,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter a new password",
      validator: onBlurValidate_PasswordInput,
    },
    {
      type: "password",
      name: "passwordRepeat",
      placeholder: "Repeat your password",
      validator: onBlurValidate_PasswordRepeatInput,
    },
  ];

  const onSubmitForm = (e) => {
    e.preventDefault();
    const newData = {
      firstName,
      lastName,
      birthday,
      email,
      password,
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
    console.log("resulted user");
    console.log(user);

    updateUser(user)
      .then((newData) => {
        console.log(newData);
        userDispatch(userUpdateAccount_Action(newData));
        saveUserOnCookie(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      className="container"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
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
          return (
            <TextField
              key={input.name}
              onInput={input.validator}
              error={!isValidInputs_array[input.name]}
              type={input.type}
              label={input.name}
              variant="outlined"
              helperText={invalidInput_message[input.name]}
              InputProps={{}}
            />
          );
        })}

        <Stack spacing={2} direction="row" sx={{ pb: 20 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitDisabled()}
          >
            Update
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
