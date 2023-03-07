import { deleteUserFromCookie } from "Cookies/cookies";

export default function passErrorMessage(err) {
  console.log(err);

  if (err.code === "ERR_NETWORK") throw new Error("ERR_NETWORK");

  const errResponse = err.response;
  console.log(errResponse);
  //TODO handle errors

  if (errResponse.data !== undefined) {
    const responseData = errResponse.data;

    if (responseData === "TokenExpired") {
      deleteUserFromCookie();
      return;
    }
  }
  //console.log(err.data);
  if (errResponse.name) {
    throw new Error(err.data.name);
  }
  if (err.code === "ERR_NETWORK") {
    throw new Error("ERR_NETWORK");
  } else {
    if (err.response && err.response.status === 400) {
      // throw new Error(err.response.data.error.message);
    }
  }
  //window.location.assign("/NotFound404");
}
