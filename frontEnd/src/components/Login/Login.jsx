import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormHelperText,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { UserContext } from "Context/userContext";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { login } from "server/auth";
import { saveUserOnCookie } from "Cookies/cookies";
import authErrorHandler from "errorHandlers/authErrors";
import { userLogin_Action } from "Reducers/Actions/UserActions";

export default function Login(props) {
  const { userDispatch } = useContext(UserContext);

  const navigate = useNavigate();

  //STATES
  const [, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.errorMessage) setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  //INPUT STATES
  const [invalidInput_message, setInvalidInput_message] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [inputValid, setInputValid] = useState({
    email: true,
    password: true,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitDisabled = () => {
    return email === "" || password === "";
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

  const onInputPasswordInput = (event) => {
    const passwordValue = event.target.value.trim();
    if (passwordValue === "") {
      setPassword("");
      setInvalidInput_message({
        ...invalidInput_message,
        password: "enter password",
      });
      setInputValid({ ...inputValid, password: false });
    } else {
      setPassword(passwordValue);
      setInputValid({ ...inputValid, password: true });
      setInvalidInput_message({ ...invalidInput_message, password: "" });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    login(email, password)
      .then((userData) => {
        console.log("DATA FROM SERV : " + userData);

        userDispatch(userLogin_Action(userData));

        saveUserOnCookie(userData);
        const path = "../" + userData.user.role;
        navigate(path, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        //TODO:login errors
        const errorMessage = authErrorHandler(err);
        console.log(errorMessage);
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
          Sign in
        </Typography>
        {invalidInput_message.general !== "" && (
          <FormHelperText error>{invalidInput_message.general}</FormHelperText>
        )}
        <TextField
          onInput={onInputEmailInput}
          error={!inputValid.email}
          // {inputValid.email && error}
          required
          id="standard-required"
          label="Email"
          // defaultValue="Hello World"
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

        <TextField
          onInput={onInputPasswordInput}
          required
          error={!inputValid.password}
          id="standard-password-input"
          label="Password"
          type="password"
          // autoComplete="current-password"
          variant="outlined"
          helperText={invalidInput_message.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Stack spacing={2} direction="row" sx={{ pb: 20 }}>
          <Button variant="text" size="small">
            Forgot password
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitDisabled()}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
