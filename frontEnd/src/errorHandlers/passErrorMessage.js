import { deleteUserFromCookie } from "Cookies/cookies";

export default function passErrorMessage(err) {
  const errResponse = err.response;
  const responseData = errResponse.data;
  console.log(errResponse);
  //TODO handle errors

  if (responseData === "TokenExpired") {
    deleteUserFromCookie();
    return;
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
