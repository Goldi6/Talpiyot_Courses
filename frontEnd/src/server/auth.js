import Axios from "axios";

import { getTokenFromCookie } from "../Cookies/cookies";
import { AUTH_Header } from "./headers";
import { returnUserDataSet } from "utils/userDataSet";
import authErrorHandler from "errorHandlers/authErrors";
import { axiosRequest } from "./axiosRequest";
const path = process.env.REACT_APP_PATH;

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  const body = {
    firstName,
    lastName,
    email,
    password,
    role,
  };

  try {
    const res = await Axios.post(`${path}/users`, body, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return { ...returnUserDataSet(res.data) };
  } catch (err) {
    authErrorHandler(err);
  }
};
export const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  try {
    const res = await Axios.post(`${path}/login`, body);

    return {
      token: res.data.token,
      user: returnUserDataSet(res.data.user),
    };
  } catch (err) {
    authErrorHandler(err);
  }
};

export const logout = async () => {
  return axiosRequest("get", `/logout`, true);
};
