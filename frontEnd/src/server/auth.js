import Axios from "axios";

import { getTokenFromCookie } from "../Cookies/cookies";
import passErrorMessage from "./passErrorMessage";
import { AUTH_Header } from "./headers";
import { returnUserDataSet } from "utils/userDataSet";
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
    const res = await Axios.post(`${path}/users`, {
      firstName,
      lastName,
      email,
      password,
      role,
    });

    return { ...returnUserDataSet(res.data) };
  } catch (err) {
    passErrorMessage(err);
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
    passErrorMessage(err);
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
