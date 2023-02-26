const express = require("express");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const { verifyRequestFields } = require("../middleware/modelFieldsVarifiers");
const verifyProfessor = require("../middleware/verifyProfessor");
const Schedule = require("../models/scheduleModel");
const User = require("../models/userModel");
const CustomError = require("../utils/customError");
const Attendant = require("../models/attendantsModel");

const router = new express.Router();
async function createAttendances(courses) {
  if (courses.length === 0) {
    // Base case: if there are no more courses to process, return
    return;
  }

  const course = courses[0];
  const students = course.students;
  const schedule = course.schedule;

  if (students.length === 0 && schedule.length === 0) {
    return res.send("no schedule or students");
  }

  for (let student of students) {
    student = student.toString();

    for (const scheduledClass of schedule) {
      // Create a new attendance record for the current student and schedule
      const attendance = new Attendant({
        courseId: course._id,
        student: student,
        class: scheduledClass._id,
        date: scheduledClass.date,
      });

      if (!attendance) continue;
      // Save the attendance record to the database
      await attendance.save();
    }
  }

  // Recursively process the remaining courses

  await createAttendances(courses.slice(1));
}

router.post(
  "/helpers/createAttendanceForCourse",
  async function (req, res, next) {
    const courses = await Course.find().populate({
      path: "schedule",
      select: "id date",
    });

    createAttendances(courses);

    res.send(courses);
  }
);

module.exports = router;
