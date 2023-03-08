export default function authErrorHandler(err) {
  err = err.split(":");
  switch (err[0]) {
    case "DuplicateValue_email":
      return {
        email: "The email address is already in use by another account.",
      };
    case "UserNotFound":
      return { general: "Wrong email or password" };
    case "ValidationError":
      console.log(err);
      const key = err[1].trim();
      const message = err[2].trim();
      return { [key]: message };

    case "InternalError": {
      return {
        general: "Internal server error. Please try again later.",
      };
    }

    default:
      return { general: "Something went wrong. Please try again." };
  }
}
