const Course = require("../models/courseModel");
const verifyProfessor = require("../middleware/verifyProfessor");
const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");
const conn = require("../db/mongoose");

exports.getCourse = async (req, res, next) => {
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
};

exports.getAllCourses = async (req, res, next) => {
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
};

exports.createCourse = async (req, res, next) => {
  const courseData = req.body;

  try {
    const course = await new Course(courseData).save();

    res.send(course);
  } catch (error) {
    next(error);
  }
};

//TODO: check if used
exports.updateCourse = async (req, res, next) => {
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
};

exports.deleteCourse = async (req, res, next) => {
  const _id = req.params["courseId"];

  const session = await conn.startSession();
  try {
    session.startTransaction();

    await Course.findByIdAndDelete(_id, { session });
    await Schedule.deleteMany({ courseId: _id }, { session });
    await Attendant.deleteMany({ courseId: _id }, { session });

    await session.commitTransaction();

    res.send("Course and all its data is deleted!");
  } catch (error) {
    await session.abortTransaction();
    return next(error);
  }
  session.endSession();
};
