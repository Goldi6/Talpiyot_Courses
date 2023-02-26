export default function passErrorMessage(err) {
  console.log(err);
  //console.log(err.data);
  if (err.data.name) {
    throw new Error(err.data.name);
  }
  if (err.code === "ERR_NETWORK") {
    throw new Error("ERR_NETWORK");
  } else {
    if (err.response && err.response.status === 400) {
      throw new Error(err.response.data.error.message);
    }
  }
}
