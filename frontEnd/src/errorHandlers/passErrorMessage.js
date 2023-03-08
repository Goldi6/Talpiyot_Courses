import { deleteUserFromCookie } from "Cookies/cookies";

export default function passErrorMessage(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    const responseData = error.response.data;

    if (responseData === "UserNotFound") throw new Error(responseData);
    if (responseData === "InternalError") throw new Error(responseData);
    if (responseData.name === "DuplicateValue_email")
      throw new Error(responseData.name);

    if (responseData === "TokenExpired") {
      deleteUserFromCookie();
      return;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);

    if (error.code === "ERR_NETWORK") throw new Error("ERR_NETWORK");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}
