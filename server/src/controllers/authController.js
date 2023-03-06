const User = require("../models/userModel");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmailAndPassword(email, password);
    if (!user) {
      return next(user);
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  if (req.user.token === "") return next("NoToken");
  req.user.token = "";

  try {
    await req.user.save();

    res.send("user logged out");
  } catch (err) {
    next(err);
  }
};
