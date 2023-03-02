import axios from "axios";
import passErrorMessage from "./passErrorMessage";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";
import { returnUserDataSet } from "utils/userDataSet";

const path = process.env.REACT_APP_PATH;

export const updateProfile = async (user) => {
  try {
    const res = await axios.patch(
      `${path}/my-profile`,
      { user },
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );
    console.log(res.data);
    return {
      token: res.data.token,
      user: returnUserDataSet(res.data),
    };
  } catch (err) {
    passErrorMessage(err);
  }
};

export async function getUserCurses() {
  try {
    const req = await axios.get(`${path}/my-profile/courses`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}
export async function getUserSchedule() {
  try {
    const req = await axios.get(`${path}/my-profile/schedule`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}
export async function getNextClassForUser() {
  try {
    const req = await axios.get(`${path}/my-profile/class`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    console.log(req.data);
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}
//
//
export async function attendOnTime(classID, attendanceID) {
  try {
    const req = await axios.patch(
      `${path}/my-profile/schedule/${classID}/attend/${attendanceID}`,
      {},
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}

export async function markAttendedAfterClassWasOver(attendanceId) {
  try {
    const req = await axios.patch(
      `${path}/my-profile/attend/${attendanceId}`,
      {},
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}

export async function submitAbsenceReason(attendanceID, reason) {
  try {
    const req = await axios.post(
      `${path}/my-profile/attendance/${attendanceID}/absenceReason`,
      { reason },
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}

export async function getUnattendedClasses() {
  try {
    const req = await axios.get(`${path}/my-profile/unattendedClasses`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
}
