import { Container } from "@mui/material";
import { UserContext } from "Context/userContext";
import { saveUserOnCookie } from "Cookies/cookies";
import { userUpdateAccount_Action } from "Reducers/Actions/UserActions";
import React, { useContext, useState } from "react";
import { updateProfile } from "server/profile";
import MuiUpdateProfileForm from "components/Mui_Form/forms/ProfileForm/MuiUpdateProfileForm";
import authErrorHandler from "errorHandlers/authErrors";
import UserData from "./UserData";

export default function Profile() {
  const { userDispatch, userData } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const updateFunc = (data) => {
    updateProfile(data)
      .then((newData) => {
        userDispatch(userUpdateAccount_Action(newData));
        saveUserOnCookie(newData);
      })
      .catch((err) => {
        const errorMessage = authErrorHandler(err.message);
        if (errorMessage.email) setErrorMessage(errorMessage.email);
        if (errorMessage.general) setErrorMessage(errorMessage.general);
      });
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
      <UserData userData={userData.user} />
      <MuiUpdateProfileForm
        userData={userData.user}
        updateFunc={updateFunc}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
