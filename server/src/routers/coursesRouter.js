const express = require("express");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const { verifyRequestFields } = require("../middleware/modelFieldsVarifiers");
const verifyProfessor = require("../middleware/verifyProfessor");
const Schedule = require("../models/scheduleModel");
const User = require("../models/userModel");
const CustomError = require("../utils/customError");

const router = new express.Router();

//TODO apply filters
router.get(
  "/professor/courses",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    // const limit = parseInt(req.query.limit ? req.query.limit : "");
    // const page = parseInt(req.query.page ? req.query.page : "");
    // let sortDate = parseInt(req.query.sortDate ? req.query.sortDate : "");
    // sortDate = sortDate === "desc" ? 1 : -1;

    // const filterQuery = req.query.filter;
    // const filters = {};
    //TODO: add regex search from middle/pagination
    try {
      const courses = await Course.find();

      for (const course of courses) {
        await course.populate("schedule");
      }

      res.send(courses);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/professor/students",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    // const limit = parseInt(req.query.limit ? req.query.limit : "");
    // const page = parseInt(req.query.page ? req.query.page : "");
    // let sortDate = parseInt(req.query.sortDate ? req.query.sortDate : "");
    // sortDate = sortDate === "desc" ? 1 : -1;

    // const filterQuery = req.query.filter;
    // const filters = {};
    //TODO: add regex search from middle/pagination
    try {
      const students = await User.find({ role: "student" });
      console.log(students);

      res.send(students);
    } catch (err) {
      next(err);
    }
  }
);

// router.get("/scheduleAttend", auth, async (req, res, next) => {
//   const courses = req.user.courses;
//   const now = new Date();
//   const dayEnd = new Date(today);
//   //get closest course for today
//   // when ends get next course if browser is open.

//   // const schedule = courses.map(async (courseId) => {
//   //   const courseSchedule = await Schedule.find({
//   //     courseId,
//   //     time: { min: today, max: dayEnd },
//   //   });
//   // });
// });

// router.post(
//   "/course/:id/:student",
//   auth,
//   verifyProfessor,
//   async (req, res, next) => {
//     const studentId = req.params.students;
//     const courseId = req.params.id;

//     try {
//       const course = await Course.findById(courseId);
//       if (!course) next(new CustomError("Course not found", "NotFound", 404));

//       const student = await User.findById(studentId);
//       if (!student) next(new CustomError("Student not found", "NotFound", 404));

//       course.students.push(student._id);

//       await course.save();

//       res.send(course);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// router.post("/course/:id", auth, verifyProfessor, async (req, res, next) => {
//   const courseId = req.params.id;
//   const dates = req.body;

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) next(new CustomError("Course not found", "NotFound", 404));

//     for (const dateRange of dates) {
//       const startTimeStamp = new Date(dateRange.startTime);
//       const endTimeStamp = new Date(dateRange.endTime);
//       if (startTimeStamp > endTimeStamp) {
//         next(new CustomError("Invalid date range", "BadRequest", 400));
//       }

//       const schedule = await new Schedule({
//         courseId,
//         startTimestamp,
//         endTimestamp,
//       }).save();

//       if (!schedule)
//         return next(new Error(`somethingWrong, not all dates are saved!`));
//       course.dates.push(schedule._id);
//       await course.save();
//     }

//     course.populate("dates");
//     res.send(course);
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/course/:id", auth, verifyProfessor, async (req, res, next) => {
//   try {
//     const course = await Course.findById(req.params["id"]);
//     if (course) {
//       for (let date of course.dates) {
//         //TODO check wich id
//         await Schedule.findOneAndDelete(date.id);
//       }
//     }

//     await Course.findByIdAndDelete(req.params.id);

//     res.send("course and dates deleted deleted");
//   } catch (err) {
//     next(err);
//   }
// });
// router.get("/course/:id", auth, async (req, res, next) => {
//   const _Id = req.params["id"];

//   try {
//     const course = await Course.findById(_Id);
//     await course.populate("dates");

//     const dates = course.dates;
//     console.log(dates);
//     delete dates.courseId;
//     if (req.user.role === "professor") {
//       dates.populate("attended");
//       dates.populate("unattended");
//     }
//     if (req.user.role === "student") {
//       delete dates.attended;
//       delete dates.unattended;
//     }

//     res.send(course);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
