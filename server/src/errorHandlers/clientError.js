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
    console.log(message);
    message = message.replace("User validation failed", err.name);
    return res.status(400).send(message);
    // console.log(path);
    // const failedFields = err.errors;
    // for (let field in failedFields) {
    //   field = failedFields[field];
    //   const path = field.properties.path;
    //   const kind = field.kind;
    //   let reason = field.properties.message;
    //   if (kind !== "user defined") {
    //     console.log(kind);
    //     console.log("USERDEFINED");
    //     const cutIndex = reason.indexOf(")");
    //     reason = reason.slice(cutIndex + 2);
    //     console.log(reason);
    //   }
    //   if (reason.includes("is required")) {
    //     reason = "is required";
    //   }

    //   let errObject = { path, reason };
    //   errorsArray.push(errObject);

    // }
  }

  next(err);
};

module.exports = clientErrorHandler;
