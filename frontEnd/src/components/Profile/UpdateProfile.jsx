import { UserContext } from "Context/userContext";
import { saveUserOnCookie } from "Cookies/cookies";
import { userUpdateAccount_Action } from "Reducers/Actions/UserActions";
import MuiUpdateProfileForm from "components/Mui_Form/forms/ProfileForm/MuiUpdateProfileForm";
import authErrorHandler from "errorHandlers/authErrors";
import React, { useContext, useState } from "react";
import { updateProfile } from "server/profile";

export default function UpdateProfile() {
  const { userDispatch, userData } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const updateFunc = (data) => {
    return updateProfile(data)
      .then((newData) => {
        userDispatch(userUpdateAccount_Action(newData));
        saveUserOnCookie(newData);
        setErrorMessage("");
        return true;
      })
      .catch((err) => {
        const errorMessage = authErrorHandler(err.message);
        if (errorMessage.email) setErrorMessage(errorMessage.email);
        if (errorMessage.general) setErrorMessage(errorMessage.general);
        return false;
      });
  };

  return (
    <MuiUpdateProfileForm
      updateFunc={updateFunc}
      errorMessage={errorMessage}
      userData={userData.user}
    />
  );
}
