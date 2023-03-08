import { returnUserDataSet } from "utils/userDataSet";
import { axiosRequest } from "./axiosRequest";

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

  return axiosRequest("post", "/users", true, body).then((data) => {
    console.log(data);

    return {
      ...returnUserDataSet(data),
    };
  });
};
export const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  return axiosRequest("post", `/login`, false, body).then((data) => ({
    token: data.token,
    user: returnUserDataSet(data.user),
  }));
};

export const logout = async () => {
  return axiosRequest("get", `/logout`, true);
};
