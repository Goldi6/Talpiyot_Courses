import axios from "axios";
import { path } from "./pathToServer";
import passErrorMessage from "./passErrorMessage";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";

export const getAttendanceData = async () => {
  //  console.log("GETTER" + type_path);
  try {
    const req = await axios.get(`${path}/professor/attendance`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    //    console.log(req.data);
    return req.data;
  } catch (error) {
    console.log(error);
  }
};
