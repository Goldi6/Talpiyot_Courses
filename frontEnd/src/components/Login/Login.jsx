import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { UserContext } from "Context/userContext";
import { useNavigate } from "react-router-dom";
import { login } from "server/auth";
import { saveUserOnCookie } from "Cookies/cookies";
import authErrorHandler from "errorHandlers/authErrors";
import { userLogin_Action } from "Reducers/Actions/UserActions";
import MuiLoginForm from "components/Mui_Form/forms/MuiLoginForm";

export default function Login(props) {
  const { userDispatch } = useContext(UserContext);

  const navigate = useNavigate();

  //STATES
  const [, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.errorMessage) setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  //INPUT STATES
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const loginFunc = (email, password) => {
    login(email, password)
      .then((userData) => {
        userDispatch(userLogin_Action(userData));

        saveUserOnCookie(userData);
        const path = "../" + userData.user.role;
        navigate(path, { replace: true });
      })
      .catch((err) => {
        const errorMessage = authErrorHandler(err.message);
        setGeneralErrorMessage(errorMessage.general);
      });
  };

  return (
    <Container
      className="container"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <MuiLoginForm
        loginFunc={loginFunc}
        generalErrorMessage={generalErrorMessage}
      />
    </Container>
  );
}
