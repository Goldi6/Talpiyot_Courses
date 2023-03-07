const express = require("express");
const verifyProfessor = require("../middleware/verifyProfessor");
const Course = require("../models/courseModel");

const router = express.Router();

const coursesController = require("../controllers/coursesController");
const { verifyRequestFields } = require("../middleware/modelFieldsVerifiers");

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(
    verifyProfessor,
    verifyRequestFields(Course, ["schedule", "students"]),
    coursesController.updateCourse
  )
  .delete(verifyProfessor, coursesController.deleteCourse);

router
  .route("")
  .get(verifyProfessor, coursesController.getAllCourses)
  .post(
    verifyProfessor,
    verifyRequestFields(Course, ["schedule", "students"]),
    coursesController.createCourse
  );
module.exports = router;
