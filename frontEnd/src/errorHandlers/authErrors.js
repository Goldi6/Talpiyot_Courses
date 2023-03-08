export default function authErrorHandler(err) {
  switch (err) {
    case "DuplicateValue_email":
      return {
        email: "The email address is already in use by another account.",
      };
    case "UserNotFound":
      return { general: "Wrong email or password" };

    case "InternalError": {
      return {
        general: "Internal server error. Please try again later.",
      };
    }

    default:
      return { general: "Something went wrong. Please try again." };
  }
}
