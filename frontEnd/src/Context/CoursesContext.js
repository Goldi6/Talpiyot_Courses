import React, { createContext, useContext, useEffect, useReducer } from "react";

import { useNavigate } from "react-router-dom";
///////////////////////////////
import { UserContext } from "./userContext";
import { getCourses } from "../server/db";
import arrayOfDataObjectsReducer, {
  initItemList_Action,
} from "Reducers/CoursesReducer";

export const CoursesContext = createContext(null);

export default function CoursesContextProvider(props) {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [listData, listDispatch] = useReducer(arrayOfDataObjectsReducer, []);

  useEffect(() => {
    let isComponentExists = true;
    getCourses()
      .then((dataList) => {
        if (dataList !== undefined)
          if (isComponentExists) listDispatch(initItemList_Action(dataList));
      })
      .catch((error) => {
        navigate("/NotFound404", { replace: true, state: { error: error } });
        //TODO: handle error
        console.log(error);
      });

    return () => {
      isComponentExists = false;
    };
  }, [navigate, userData.token]);

  return (
    <CoursesContext.Provider
      value={{ coursesData: listData, coursesDispatch: listDispatch }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
}
