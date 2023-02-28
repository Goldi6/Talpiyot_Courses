//#region

const express = require("express");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const verifyProfessor = require("../middleware/verifyProfessor");
const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");
const lodash = require("lodash");

//
//
const { getSimpleDate } = require("../utils/dates");

const router = new express.Router();

//#endregion

router.post(
  "/professor/attendance/:courseId",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    const courseId = req.params.courseId;

    const { classes } = req.body;

    try {
      const passSchedulePromises = classes.map(async (classId) => {
        const data = await Attendant.find({
          courseId,
          class: classId,
        })
          .select("-courseId -class -createdAt -updatedAt -date")
          .populate({ path: "student", select: "firstName lastName email" });
        return { classId, data };
      });

      const schedules = await Promise.all(passSchedulePromises);

      res.send(schedules);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/professor/attendance",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    //   const attendance = Attendant.aggregate([]);

    const attendants = await Attendant.aggregate([
      {
        $group: {
          _id: {
            courseId: "$courseId",

            class: "$class",
          },
          docs: { $push: "$$ROOT" },
        },
      },
      {
        $group: {
          _id: {
            courseId: "$_id.courseId",
          },
          classes: {
            $push: {
              class: "$_id.class",
              docs: "$docs",
            },
          },
        },
      },
      {
        $project: {
          "classes.docs.courseId": 0,
          "classes.docs._id": 0,
          "classes.docs.date": 0,
          "classes.docs.createdAt": 0,
          "classes.docs.updatedAt": 0,
          "classes.docs.__v": 0,
          "classes.docs.class": 0,
        },
      },
    ]);

    for (const doc of attendants) {
      /////
      //handle course
      const courseId = doc._id.courseId;
      const course = await Course.findById(courseId).select(
        "name startDate endDate"
      );

      const clone = course.toObject();
      delete clone._id;

      clone.startDate = getSimpleDate(course.startDate);
      clone.endDate = getSimpleDate(course.endDate);

      doc.course = clone;
      delete doc._id;
      ///
      ///
      //handle class
      for (const classObj of doc.classes) {
        const scheduledClass = await Schedule.findById(classObj.class).select(
          "startTime endTime"
        );
        const clone = scheduledClass.toObject();

        classObj.class = clone.dateAndTime;
        classObj.startTimeStamp = clone.startTime;
        classObj.passed = new Date(classObj.startTimeStamp) < new Date();

        ///
        ///
        /// handle students
        const students = classObj.docs;

        const attended = [];
        const unattended = [];

        for (const studentObj of students) {
          const student = await User.findById(studentObj.student).select(
            "firstName lastName email"
          );

          const clone = student.toObject();
          delete clone._id;

          // console.log(studentObj.attended);
          studentObj.student = clone;
          //delete studentObj.attended;
          if (studentObj.attended) attended.push(studentObj);
          else unattended.push(studentObj);
        }
        classObj.attendees = attended;
        classObj.absentees = unattended;
        delete classObj.docs;
      }
      const sorted = doc.classes.sort((a, b) => {
        const dateA = new Date(a.startTimeStamp);
        const dateB = new Date(b.startTimeStamp);

        return dateA - dateB;
      });
      doc.classes = sorted;
    }

    res.send(attendants);
  }
);

module.exports = router;
