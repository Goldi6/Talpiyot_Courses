import React, { createContext, useContext, useEffect, useReducer } from "react";

import { getCourse } from "../server/db";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
import { initCourseRoom_Action } from "Reducers/Actions/CourseAction";
import courseReducer from "Reducers/CourseReducer";

export const CourseContext = createContext(null);

export default function CourseContextProvider(props) {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [courseData, courseDispatch] = useReducer(courseReducer, null);
  useEffect(() => {
    let isComponentExists = true;
    getCourse(props.id)
      .then((course) => {
        if (course)
          if (isComponentExists) courseDispatch(initCourseRoom_Action(course));
      })
      .catch((error) => {
        navigate("/NotFound404", { replace: true, state: { error: error } });
        console.log(error);
      });

    return () => {
      isComponentExists = false;
    };
  }, [props.id, navigate, userData.token]);

  return (
    <CourseContext.Provider value={{ courseData, courseDispatch }}>
      {props.children}
    </CourseContext.Provider>
  );
}
