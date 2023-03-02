const User = require("../models/userModel");
const CustomError = require("../utils/customError");

const verifyProfessor = async (req, res, next) => {
  try {
    if (req.user.role === "professor") {
      return next();
    }

    next(new CustomError("You are not a professor", "NotAuthorized", 401));
  } catch (err) {
    next(err);
  }
};

module.exports = verifyProfessor;
