import { returnUserDataSet } from "utils/userDataSet";

import { axiosRequest } from "./axiosRequest";

export const updateProfile = async (user) => {
  return await axiosRequest("patch", "/users", true, { user }).then((data) => ({
    token: data.token,
    user: returnUserDataSet(data),
  }));
};

export async function getUserCurses() {
  return axiosRequest("get", `/my-profile/courses`, true);
}
export async function getUserSchedule() {
  return axiosRequest("get", `/my-profile/schedule`, true);
}
export async function getNextClassForUser() {
  return axiosRequest("get", `/my-profile/class`, true);
}
//
//
export async function attendOnTime(classID, attendanceID) {
  return axiosRequest(
    "patch",
    `/my-profile/schedule/${classID}/attend/${attendanceID}`,
    true
  );
}

export async function markAttendedAfterClassWasOver(attendanceId) {
  return axiosRequest("patch", `/my-profile/attend/${attendanceId}`, true);
}

export async function submitAbsenceReason(attendanceID, reason) {
  return axiosRequest(
    "post",
    `/my-profile/attendance/${attendanceID}/absenceReason`,
    true,
    { reason }
  );
}

export async function getUnattendedClasses() {
  return axiosRequest("get", `/my-profile/unattendedClasses`, true);
}
