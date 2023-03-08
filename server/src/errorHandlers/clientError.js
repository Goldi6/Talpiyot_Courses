const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

//TODO client errors
// class requestBodyFieldsError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "requestBodyFieldsFailedValidation";
//     this.status = 400;
//   }
// }
// class EmptyDataError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "EmptyData";
//     this.status = 404;
//   }
// }
// class AuthError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "NotAuthorized";
//     this.status = 401;
//   }
// }

// class ValidationError extends Error {
//   constructor(message, errorObjectsArray = []) {
//     super(message);
//     this.name = "ValidationFailed";
//     this.errorObjects = errorObjectsArray;
//     this.status = 400;
//   }
// }

const clientErrorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    //TODO: check if that is for email
    console.log("KEY_PATTERN", Object.keys(err.keyPattern));
    const key = Object.keys(err.keyPattern)[0];
    const textMessage = `DuplicateValue_${key}`;
    const error = new CustomError("value already exists", textMessage, 400);
    console.log(error);
    return res.status(400).send(error);
  }

  switch (err.name) {
    case "UserNotFound":
      return res.status(404).send(err.name);
    case "DuplicateValue_email":
      return res.status(400).send(err.name);
    case "CastError":
      // return res.status(400).send(
      //   new CustomError({
      //     message: "Bad request. Course doesn't exists",
      //     name: "CastError",
      //     status: 400,
      //   })
      // );
      return res.status(400).send("Bar request, Course not found");
  }

  ///
  //login error
  // if (err.message === "unable to login") {
  //   clientError = new ValidationError("Failed to login", [
  //     { path: "login", reason: "Wrong email or password" },
  //   ]);
  //   console.log("login ERROR");
  //   return res.status(400).send(clientError);
  // }
  // ///
  // ///
  // if (err.name === "CastError") {
  //   console.log("INSIDE cAST ERR");
  //   const message =
  //     "The book might no longer exist in the store or the request might be wrong.";
  //   //const clientError = new EmptyDataError(message);
  //   const error = { message };

  //   return res.render("404", { error });
  // }
  // ///
  // ///
  // ///
  // if (err.name === "ValidationError") {
  //   let message = "Input validation failed";
  //   // console.log(path);
  //   const failedFields = err.errors;
  //   for (let field in failedFields) {
  //     field = failedFields[field];
  //     const path = field.properties.path;
  //     const kind = field.kind;
  //     let reason = field.properties.message;
  //     if (kind !== "user defined") {
  //       console.log(kind);
  //       console.log("USERDEFINED");
  //       const cutIndex = reason.indexOf(")");
  //       reason = reason.slice(cutIndex + 2);
  //       console.log(reason);
  //     }
  //     if (reason.includes("is required")) {
  //       reason = "is required";
  //     }

  //     let errObject = { path, reason };
  //     errorsArray.push(errObject);
  //     // console.log(reason, "\n\n");
  //     // console.log(path);
  //   }
  //   clientError = new ValidationError(message, errorsArray);
  //   //res.send(userError);
  //   //console.log(err.errors);
  // }

  // if (err.name === "MongoServerError") {
  //   let message = "";
  //   const code = err.message.split(" ")[0];
  //   //console.log(code);
  //   if (code === "E11000") {
  //     console.log(err.keyPattern, "keyPattern");
  //     console.log(err.keyValue, "keyValue");
  //     message =
  //       "This email already exists in our system, try to log in or request a password reset.";

  //     //console.log("MONGOERROR");
  //   }
  //   clientError = new ValidationError(
  //     "This email is already registered in our system",
  //     [{ path: "email", reason: message }]
  //   );
  // }
  // //
  // //   if (err.name === "EmptyBooksData") {
  // //     let message = "No books were found according to your request.";
  // //     message = isAdmin ? message + "\n try to add some new books" : message;
  // //     clientError = new EmptyDataError(message);
  // //     //res.send(noDataError);
  // //   }

  // //   //
  // //   if (err.name == "wrongFields") {
  // //     const message =
  // //       "something was wrong with the request, please try again some other time, or report about this problem";
  // //     clientError = new requestBodyFieldsError(message);
  // //     //res.send(clientError);
  // //   }

  // ///auth errors
  // if (err.name === "NoToken") {
  //   clientError = new AuthError("user is not Logged In");
  // }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(400).send("TokenExpired");
  }
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(400).send("TokenExpired");
  }

  // if (clientError instanceof AuthError) {
  //   console.log("Auth Error");
  //   if (req.url.includes("admin")) {
  //     return res.redirect("/admin/login");
  //   } else if (req.url.includes("user")) {
  //     let url = req.url;
  //     url = url.replace("user/", "");
  //     console.log(url);
  //     return res.redirect(url);
  //   } else {
  //     console.log("no user in url");
  //     return res.redirect("/");
  //   }
  // }

  // if (
  //   clientError instanceof ValidationError ||
  //   clientError instanceof EmptyDataError ||
  //   clientError instanceof requestBodyFieldsError
  // ) {
  //   return res.send(clientError);
  // }

  next(err);
};

module.exports = clientErrorHandler;
