import axios from "axios";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";
import passErrorMessage from "errorHandlers/passErrorMessage";

const path = process.env.REACT_APP_PATH;

export const getList = async (type_path) => {
  //  console.log("GETTER" + type_path);
  try {
    const req = await axios.get(`${path}/professor/${type_path}`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};
export const getCourses = async () => {
  try {
    const req = await axios.get(`${path}/courses`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};
export const getStudents = async () => {
  //  console.log("GETTER" + type_path);
  try {
    const req = await axios.get(`${path}/users/students`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const deleteItem = async (id, from_path) => {
  try {
    const req = await axios.delete(`${path}/${from_path}/${id}`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const createCourse = async (courseData) => {
  try {
    const req = await axios.post(`${path}/courses`, courseData, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const getCourse = async (id) => {
  const reqPath = `${path}/courses/${id}`;
  try {
    const req = await axios.get(reqPath, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const addStudentToCourse = async (course_id, student_id) => {
  // "addStudent / removeStudent"
  try {
    const router_path = `${path}/courses/${course_id}/students/${student_id}`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.post(
      router_path,
      {},
      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const deleteStudentFromCourse = async (course_id, student_id) => {
  // previous version used patch for both delete and post actions, editCourseStudentList() :"addStudent / removeStudent"
  try {
    const router_path = `${path}/courses/${course_id}/students/${student_id}`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.delete(
      router_path,

      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const deleteClassFromCourse = async (course_id, class_id) => {
  try {
    const router_path = `${path}/courses/${course_id}/class/${class_id}`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.delete(
      router_path,

      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const addCourseSchedule = async ({
  courseId,
  date,
  startTime,
  endTime,
}) => {
  console.log(courseId);
  try {
    const router_path = `${path}/courses/${courseId}/class`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.post(
      router_path,
      { courseId, date, startTime, endTime },
      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

export const updateCourseSchedule = async (
  { courseId, date, startTime, endTime },
  action
) => {
  // "addClass / removeClass"

  try {
    const router_path = `${path}/course/${action}/${courseId}`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.post(
      router_path,
      { courseId, date, startTime, endTime },
      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    return passErrorMessage(error);
  }
};

//
//
////
//
//
//
