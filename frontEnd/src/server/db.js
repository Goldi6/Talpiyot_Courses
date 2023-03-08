import { axiosRequest } from "./axiosRequest";

export const getCourses = async () => {
  return axiosRequest("get", `/courses`, true);
};
export const getStudents = async () => {
  return axiosRequest("get", `/users/students`, true);
};

export const deleteItem = async (id, from_path) => {
  return axiosRequest("delete", `/${from_path}/${id}`, true);
};

export const createCourse = async (courseData) => {
  return axiosRequest("post", `/courses`, true, courseData);
};

export const getCourse = async (id) => {
  return axiosRequest("get", `/courses/${id}`, true);
};

export const addStudentToCourse = async (course_id, student_id) => {
  return axiosRequest(
    "post",
    `/courses/${course_id}/students/${student_id}`,
    true
  );
};
export const deleteClassFromCourse = async (course_id, class_id) => {
  return axiosRequest(
    "delete",
    `/courses/${course_id}/class/${class_id}`,
    true
  );
};
export const deleteStudentFromCourse = async (course_id, student_id) => {
  return axiosRequest(
    "delete",
    `/courses/${course_id}/student/${student_id}`,
    true
  );
};

export const addClassToCourseSchedule = async ({
  courseId,
  date,
  startTime,
  endTime,
}) => {
  const body = { courseId, date, startTime, endTime };
  return axiosRequest("post", `/courses/${courseId}/class`, true, body);
};
