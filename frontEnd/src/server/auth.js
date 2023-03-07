import Axios from "axios";

import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";
import { returnUserDataSet } from "utils/userDataSet";
import authErrorHandler from "errorHandlers/authErrors";
import passErrorMessage from "errorHandlers/passErrorMessage";
const path = process.env.REACT_APP_PATH;

////////
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  try {
    const res = await Axios.post(
      `${path}/users`,
      {
        firstName,
        lastName,
        email,
        password,
        role,
      },
      { headers: AUTH_Header(getTokenFromCookie()) }
    );

    return { ...returnUserDataSet(res.data) };
  } catch (err) {
    authErrorHandler(err);
  }
};
export const login = async (email, password) => {
  try {
    const res = await Axios.post(`${path}/login`, {
      email,
      password,
    });

    return {
      token: res.data.token,
      user: returnUserDataSet(res.data.user),
    };
  } catch (err) {
    authErrorHandler(err);
  }
};

export const logout = async () => {
  try {
    const res = await Axios.get(`${path}/logout`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return res.data;
  } catch (err) {
    passErrorMessage(err);
  }
};
