import Axios from "axios";

import { path } from "./pathToServer";
import { getTokenFromCookie } from "../Cookies/cookies";
import passErrorMessage from "./passErrorMessage";
import { AUTH_Header } from "./headers";

const returnUserDataSet = (user) => {
  return {
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id,
  };
};

////////
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  try {
    const res = await Axios.post(`${path}/user`, {
      firstName,
      lastName,
      email,
      password,
      role,
    });

    return { ...returnUserDataSet(res.data) };
  } catch (err) {
    passErrorMessage(err.response);
  }
};
export const login = async (email, password) => {
  try {
    const res = await Axios.post(`${path}/user/login`, {
      email,
      password,
    });

    return {
      token: res.data.token,
      user: returnUserDataSet(res.data.user),
    };
  } catch (err) {
    passErrorMessage(err.response);
  }
};

export const logout = async () => {
  try {
    const res = await Axios.get(`${path}/user/logout`, {
      headers: AUTH_Header(getTokenFromCookie()),
    });

    return res.data;
  } catch (err) {
    passErrorMessage(err.response);
  }
};

export const updateUser = async (user) => {
  console.log(user);
  try {
    const res = await Axios.patch(
      `${path}/user`,
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
    passErrorMessage(err.response);
  }
};

// export const getUser = async (token) => {
//   try {
//     const res = await Axios.post(process.env.REACT_APP_GET_USER, {
//       idToken: token,
//     });

//     console.log(res.data.users[0]);
//     return {
//       token: token,
//       user: { username: "ReactUser", id: res.data.users[0].localId },
//     };
//   } catch (err) {
//     if (err.response && err.response.status === 400) {
//       throw new Error(err.response.data.error.message);
//     }
//   }
// };
