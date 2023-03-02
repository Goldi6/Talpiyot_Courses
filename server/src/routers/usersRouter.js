const express = require("express");
const User = require("../models/userModel");
const verifyProfessor = require("../middleware/verifyProfessor");

const router = express.Router();

const FILTERS = ["token", "courses"];
//TODO: verifyRequestFields on post(User, FILTERS),

//TODO patch users/:id
router.get("/students", verifyProfessor, async (req, res, next) => {
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
});

router.post("", verifyProfessor, async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();

    // const token = await user.generateAuthToken();
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyProfessor, async (req, res, next) => {
  try {
    const _id = req.params.id;
    await User.findOneAndDelete(_id);
    res.send("user Deleted");
  } catch (err) {
    next(err);
  }
});

///
//any user can do:
///
//#region any

router.patch(
  "",
  // verifyRequestFields(User, FILTERS),
  async (req, res, next) => {
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
  }
);
//#endregion

module.exports = router;
