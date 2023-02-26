const User = require("../models/userModel");
const CustomError = require("../utils/customError");

const verifyProfessor = async (req, res, next) => {
  console.log("PRODFESSOR VARIFUY");
  // console.log(req.user);
  try {
    if (req.user.role === "professor") {
      return next();
    }
    //throw new custom error
    //throw new Error("You are not a professor");
    next(new CustomError("You are not a professor", "NotAuthorized", 401));
  } catch (err) {
    next(err);
  }
};

module.exports = verifyProfessor;
