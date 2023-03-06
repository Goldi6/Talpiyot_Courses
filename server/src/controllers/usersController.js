const User = require("../models/userModel");

exports.getStudents = async (req, res, next) => {
  // const limit = parseInt(req.query.limit ? req.query.limit : "");
  // const page = parseInt(req.query.page ? req.query.page : "");
  // let sortDate = parseInt(req.query.sortDate ? req.query.sortDate : "");
  // sortDate = sortDate === "desc" ? 1 : -1;

  // const filterQuery = req.query.filter;
  // const filters = {};
  //TODO: add regex search from middle/pagination
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

    // const token = await user.generateAuthToken();
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
    const user = await User.findOneAndUpdate({ _id }, req.body.user, {
      new: true,
      runValidators: true,
    });
    if (!user) return next(user);

    return res.send(user);
  } catch (err) {
    next(err);
  }
};
