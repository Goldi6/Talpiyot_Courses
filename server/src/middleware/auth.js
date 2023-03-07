const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const CustomError = require("../utils/customError");

const authUser = async (req, res, next) => {
  try {
    if (!req.header("Authorization"))
      return next(
        new CustomError("Bad request, missing headers", "BadRequest", 401)
      );

    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return next(
        new CustomError("Bad request, no token provided", "BadRequest", 401)
      );
    }
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({
      _id: data._id,
      token: token, //way of getting values from array in mongodb
    });

    if (!user) {
      return next(user);
    } else {
      req.user = user;
      req.token = token;
      // console.log(user);
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
