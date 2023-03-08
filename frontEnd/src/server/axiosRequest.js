import axios from "axios";
import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";
import passErrorMessage from "errorHandlers/passErrorMessage";
const path = process.env.REACT_APP_PATH;

export const axiosRequest = async (method, url, authorize, clientData = {}) => {
  authorize = authorize ? AUTH_Header(getTokenFromCookie()) : {};
  try {
    const req = await axios({
      url,

      method,

      data: clientData,

      baseURL: path,

      headers: authorize,
    });
    return req.data;
  } catch (err) {
    return passErrorMessage(err);
  }
};
