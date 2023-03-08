import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormHelperText,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import validator from "validator";
import { createUser } from "server/auth";
import authErrorHandler from "errorHandlers/authErrors";
import PersonIcon from "@mui/icons-material/Person";
import { StudentsContext } from "Context/StudentsContext";
import { addItem_Action } from "Reducers/CoursesReducer";

export default function CreateUser(props) {
  const { studentsDispatch } = useContext(StudentsContext);

  //INPUT STATES
  const [invalidInput_message, setInvalidInput_message] = useState({
    email: "",
    firstName: "",
    lastName: "",
    general: "",
  });
  const [inputValid, setInputValid] = useState({
    email: true,
    firstName: true,
    lastName: true,
  });

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isSubmitDisabled = () => {
    return email === "" || firstName === "" || lastName === "";
  };

  const onInputEmailInput = (event) => {
    const emailValue = event.target.value.trim();
    if (emailValue === "" || !validator.isEmail(emailValue)) {
      setEmail("");
      setInvalidInput_message({
        ...invalidInput_message,
        email: "Invalid email",
      });
      setInputValid({ ...inputValid, email: false });
    } else {
      setEmail(emailValue);
      setInvalidInput_message({ ...invalidInput_message, email: "" });

      setInputValid({ ...inputValid, email: true });
    }
  };

  const onInputFirstNameInput = (event) => {
    const name = event.target.value.trim();
    if (name === "") {
      setFirstName("");
      setInvalidInput_message({
        ...invalidInput_message,
        firstName: "enter user name",
      });
      setInputValid({ ...inputValid, firstName: false });
    } else {
      setFirstName(name);
      setInputValid({ ...inputValid, firstName: true });
      setInvalidInput_message({ ...invalidInput_message, firstName: "" });
    }
  };
  const onInputLastNameInput = (event) => {
    const name = event.target.value.trim();
    if (name === "") {
      setLastName("");
      setInvalidInput_message({
        ...invalidInput_message,
        lastName: "enter user name",
      });
      setInputValid({ ...inputValid, lastName: false });
    } else {
      setLastName(name);
      setInputValid({ ...inputValid, lastName: true });
      setInvalidInput_message({ ...invalidInput_message, lastName: "" });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const generatePassword = () => {
      //?TODO:IMPLEMENT password generator
      const password = "123QWEasd";

      return password;
    };

    const password = generatePassword();
    //?TODO:implement user role picker
    createUser({ email, firstName, lastName, password, role: "student" })
      .then((userData) => {
        studentsDispatch(addItem_Action(userData));
      })
      .catch((err) => {
        const errorMessage = authErrorHandler(err.message);

        const emptyMessages = { ...invalidInput_message };
        for (const key in emptyMessages) {
          emptyMessages[key] = "";
        }
        setInvalidInput_message({ ...emptyMessages, ...errorMessage });
        const keys = Object.keys(invalidInput_message);

        keys.forEach((key) => {
          if (key === "general") return;
          if (invalidInput_message[key] !== "") {
            setInputValid({
              ...inputValid,
              [key]: false,
            });
          } else {
            setInputValid({
              ...inputValid,
              [key]: true,
            });
          }
        });
      });
  };
  return (
    <Box
      className="flex-half"
      onSubmit={onSubmitForm}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Typography component="h1" variant="h5" sx={{ pb: 2 }}>
        Create User
      </Typography>
      {invalidInput_message.general !== "" && (
        <FormHelperText error>{invalidInput_message.general}</FormHelperText>
      )}
      <Stack spacing={2} direction="column" sx={{ pb: 20 }}>
        <TextField
          onInput={onInputFirstNameInput}
          required
          error={!inputValid.firstName}
          label="Student First Name"
          type="text"
          // autoComplete="current-password"
          variant="outlined"
          helperText={invalidInput_message.firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onInput={onInputLastNameInput}
          required
          error={!inputValid.lastName}
          label="Student Last name"
          type="text"
          variant="outlined"
          helperText={invalidInput_message.lastName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onInput={onInputEmailInput}
          error={!inputValid.email}
          required
          id="standard-required"
          label="Email"
          variant="outlined"
          helperText={invalidInput_message.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" type="submit" disabled={isSubmitDisabled()}>
          Create Student User
        </Button>
      </Stack>
    </Box>
  );
}
