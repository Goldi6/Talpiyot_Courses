import { axiosRequest } from "./axiosRequest";

export const getAllAttendances = async () => {
  return await axiosRequest("get", "/attendance", true);
};

export const getCourseAttendance = async (courseId) => {
  return await axiosRequest("get", `/attendance/${courseId}`, true);
};
