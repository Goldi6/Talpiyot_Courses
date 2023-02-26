import axios from "axios";
import { path } from "./pathToServer";
import passErrorMessage from "./passErrorMessage";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";

export async function getStudentCurses() {
  try {
    const req = await axios.get(`${path}/student/courses`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    console.log(req.data);
    return req.data;
  } catch (error) {
    console.log(error.response);
    passErrorMessage(error.response);
  }
}
export async function getStudentSchedule() {
  try {
    const req = await axios.get(`${path}/student/schedule`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    console.log(req.data);
    return req.data;
  } catch (error) {
    console.log(error.response);
    passErrorMessage(error.response);
  }
}
export async function getNextClass() {
  try {
    const req = await axios.get(`${path}/class`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    console.log(req.data);
    return req.data;
  } catch (error) {
    console.log(error.response);
    passErrorMessage(error.response);
  }
}
//
//
export async function attendStudent(scheduleID, attendanceID) {
  try {
    const req = await axios.patch(
      `${path}/student/attend/${scheduleID}/${attendanceID}`,
      {},
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );
    return req.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    passErrorMessage(error.response);
  }
}

export async function submitUnAttendanceReason(attendanceID, reason) {
  try {
    const req = await axios.patch(
      `${path}/student/attendance/reason/${attendanceID}`,
      { reason },
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );
    return req.data;
  } catch (error) {
    console.log(error.response);
    passErrorMessage(error.response);
  }
}

export async function getUnattendedClasses() {
  try {
    const req = await axios.get(`${path}/student/unattended`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });
    return req.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    passErrorMessage(error.response);
  }
}
