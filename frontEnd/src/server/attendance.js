import { axiosRequest } from "./axiosRequest";

export const getAllAttendances = async () => {
  return await axiosRequest("get", "/attendance", true);
};

export const getCourseAttendance = async (courseId, classes) => {
  //TODO client data from the course
  if (classes.length === 0) return [];
  return await axiosRequest("post", `/attendance/${courseId}`, true, {
    classes,
  });
};
