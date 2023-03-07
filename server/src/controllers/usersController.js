const User = require("../models/userModel");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" });

    res.send(students);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    await User.findOneAndDelete(_id);
    res.send("user Deleted");
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const _id = req.user._id;
    const user = await User.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return next(user);

    return res.send(user);
  } catch (err) {
    next(err);
  }
};
