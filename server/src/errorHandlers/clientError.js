const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

const clientErrorHandler = (err, req, res, next) => {
  //mongoose validation
  if (err.code === 11000) {
    console.log("KEY_PATTERN", Object.keys(err.keyPattern));
    const key = Object.keys(err.keyPattern)[0];
    const textMessage = `DuplicateValue_${key}`;
    const error = new CustomError("value already exists", textMessage, 400);
    return res.status(400).send(error);
  }

  switch (err.name) {
    case "UserNotFound":
      return res.status(404).send(err.name);

    case "CastError":
      return res.status(400).send("DataNotFound");
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(400).send("TokenExpired");
  }
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(400).send("TokenExpired");
  }

  if (err.name === "ValidationError") {
    let message = err.message;
    message = message.replace("User validation failed", err.name);
    const failedFields = err.errors;
    const errorsArray = [];
    for (let field in failedFields) {
      field = failedFields[field];
      const path = field.path;
      const kind = field.kind;
      let reason = field.properties.message;
      if (kind === "user defined") {
        reason = reason.replace("Error: ", "");
      }
      if (reason.includes("is required")) {
        reason = "is required";
      }

      let errObject = { path, reason };
      errorsArray.push(errObject);
    }
    return res.status(400).send(errorsArray);
  }

  next(err);
};

module.exports = clientErrorHandler;
