const express = require("express");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const verifyProfessor = require("../middleware/verifyProfessor");
const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");

const router = express.Router();

router.get("/:courseId", async (req, res, next) => {
  const _id = req.params["courseId"];
  try {
    const course = await Course.findById(_id).populate("students schedule");
    if (!course) {
      next(course);
    }

    res.send(course);
  } catch (error) {
    next(error);
  }
});

//TODO apply filters
router.get("", verifyProfessor, async (req, res, next) => {
  // const limit = parseInt(req.query.limit ? req.query.limit : "");
  // const page = parseInt(req.query.page ? req.query.page : "");
  // let sortDate = parseInt(req.query.sortDate ? req.query.sortDate : "");
  // sortDate = sortDate === "desc" ? 1 : -1;

  // const filterQuery = req.query.filter;
  // const filters = {};
  //TODO: add regex search from middle/pagination
  try {
    const courses = await Course.find({}).populate("schedule");

    res.send(courses);
  } catch (err) {
    next(err);
  }
});

router.post(
  "",
  verifyProfessor,
  //TODO: verifyRequestFields(Course, [dates]),

  async (req, res, next) => {
    const courseData = req.body;

    try {
      const course = await new Course(courseData).save();

      res.send(course);
    } catch (error) {
      next(error);
    }
  }
);

//?? used
//TODO: check if used
router.patch(
  "/:courseId",

  verifyProfessor,
  //verifyRequestFields(Course, [dates]),

  async (req, res, next) => {
    const updateData = req.body;
    const _id = req.params["courseId"];
    try {
      const course = await Course.findOneAndUpdate({ _id }, updateData, {
        new: true,
        runValidators: true,
      });

      res.send(course);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:courseId",

  verifyProfessor,

  async (req, res, next) => {
    const _id = req.params["courseId"];

    try {
      // TODO: turn into a transaction
      await Course.findByIdAndDelete(_id);
      await Schedule.deleteMany({ courseId: _id });
      await Attendant.deleteMany({ courseId: _id });

      res.send("Course and all its data is deleted!");
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
