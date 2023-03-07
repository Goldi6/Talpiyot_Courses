import axios from "axios";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";
import passErrorMessage from "errorHandlers/passErrorMessage";

const path = process.env.REACT_APP_PATH;

export const getAttendanceData = async () => {
  try {
    const req = await axios.get(`${path}/attendance`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    //    console.log(req.data);
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};

export const GetClassAttendance = async (courseId, scheduleIds) => {
  if (scheduleIds.length === 0) return [];
  try {
    const req = await axios.post(
      `${path}/attendance/${courseId}`,
      { classes: scheduleIds },
      {
        headers: AUTH_Header(getTokenFromCookie()),
      }
    );

    //    console.log(req.data);
    return req.data;
  } catch (error) {
    passErrorMessage(error);
  }
};
