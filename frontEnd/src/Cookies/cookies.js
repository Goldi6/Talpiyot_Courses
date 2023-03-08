import Cookies from "js-cookie";

const USER_DATA = "user_data";

export const saveUserOnCookie = (userData) => {
  const jsonUserData = JSON.stringify(userData);
  Cookies.set(USER_DATA, jsonUserData, {
    expires: 12,
    sameSite: "strict",
    secure: true,
  });
};

export const deleteUserFromCookie = () => {
  Cookies.remove(USER_DATA, { secure: true, sameSite: "strict" });
};

export const getUserFromCookie = () => {
  const jsonUserData = Cookies.get(USER_DATA);
  if (jsonUserData === undefined) {
    return null;
  }
  return JSON.parse(jsonUserData);
};
export const getTokenFromCookie = () => {
  const jsonUserData = Cookies.get(USER_DATA);
  if (jsonUserData === undefined) {
    return null;
  }

  return JSON.parse(jsonUserData).token;
};
