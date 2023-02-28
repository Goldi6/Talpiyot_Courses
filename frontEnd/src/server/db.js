import axios from "axios";
import { path } from "./pathToServer";
import passErrorMessage from "./passErrorMessage";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";

export const getList = async (type_path) => {
  //  console.log("GETTER" + type_path);
  try {
    const req = await axios.get(`${path}/professor/${type_path}`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const createCourse = async (courseData) => {
  console.log(path + "course");
  try {
    const req = await axios.post(`${path}/course`, courseData, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const deleteItem = async (id, from_path) => {
  try {
    const req = await axios.delete(`${path}/${from_path}/${id}`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const getCourse = async (id) => {
  try {
    const req = await axios.get(`${path}/course/${id}`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const editCourseStudentList = async (course_id, student_id, action) => {
  // "addStudent / removeStudent"
  try {
    const router_path = `${path}/course/${action}/${course_id}/${student_id}`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.patch(
      router_path,
      {},
      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const deleteClassFromCourse = async (course_id, class_id) => {
  try {
    const router_path = `${path}/course/removeClass/${course_id}/${class_id}`;

    const AuthHeader = AUTH_Header(getTokenFromCookie());

    const req = await axios.delete(
      router_path,

      {
        headers: { ...AuthHeader },
      }
    );

    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const addCourseSchedule = async ({
  courseId,
  date,
  startTime,
  endTime,
}) => {
  // "addClass / removeClass"

  console.log(courseId);
  try {
    const router_path = `${path}/course/addClass/${courseId}`;

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
    passErrorMessage(error);
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
    passErrorMessage(error);
  }
};

//
//
////
//
//
//
