import { StudentsContext } from "Context/StudentsContext";
import { addItem_Action } from "Reducers/CoursesReducer";
import MuiCreateUserForm from "components/Mui_Form/forms/createUserForm/MuiCreateUserForm";
import authErrorHandler from "errorHandlers/authErrors";
import React, { useContext, useState } from "react";
import { createUser } from "server/auth";

export default function CreateUser() {
  const { studentsDispatch } = useContext(StudentsContext);

  const [errorMessage, setErrorMessage] = useState("");

  const createUserFunc = async (data) => {
    const generatePassword = () => {
      //?NOTE:IMPLEMENT password generator
      const password = "123QWEasd";

      return password;
    };
    const password = generatePassword();
    let reset = false;
    data.password = password;
    await createUser(data)
      .then((userData) => {
        studentsDispatch(addItem_Action(userData));
        setErrorMessage("");
        reset = true;
      })
      .catch((err) => {
        const errorMessage = authErrorHandler(err.message);
        if (errorMessage.email) setErrorMessage(errorMessage.email);
        if (errorMessage.general) setErrorMessage(errorMessage.general);
        reset = false;
      });
    return reset;
  };

  return (
    <MuiCreateUserForm
      errorMessage={errorMessage}
      createUserFunc={createUserFunc}
    />
  );
}
