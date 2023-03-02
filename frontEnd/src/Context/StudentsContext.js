import React, { createContext, useContext, useEffect, useReducer } from "react";

import { useNavigate } from "react-router-dom";
///////////////////////////////
import { UserContext } from "./userContext";
import { getStudents } from "../server/db";
import arrayOfDataObjectsReducer, {
  initItemList_Action,
} from "Reducers/CoursesReducer";

export const StudentsContext = createContext(null);

export default function StudentsContextProvider(props) {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [listData, listDispatch] = useReducer(arrayOfDataObjectsReducer, []);

  useEffect(() => {
    let isComponentExists = true;
    getStudents()
      .then((dataList) => {
        if (isComponentExists) listDispatch(initItemList_Action(dataList));
      })
      .catch((error) => {
        navigate("/NotFound404", { replace: true, state: { error: error } });
        //TODO: handkle error
        console.log(error);
      });

    return () => {
      isComponentExists = false;
    };
  }, [navigate, userData.token]);

  return (
    <StudentsContext.Provider
      value={{ studentsData: listData, studentsDispatch: listDispatch }}
    >
      {props.children}
    </StudentsContext.Provider>
  );
}
