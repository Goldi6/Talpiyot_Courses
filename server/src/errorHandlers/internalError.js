const CustomError = require("../utils/customError");

const internalErrorHandler = (err, req, res, next) => {
  //will get syntax errors
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(500)
    .send(new CustomError("Internal server error", "InternalError", 500));
  // res.render("error", { error: err });
};

module.exports = internalErrorHandler;
