const express = require("express");
const verifyProfessor = require("../middleware/verifyProfessor");

const router = express.Router();

const coursesController = require("../controllers/coursesController");

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(
    verifyProfessor,
    //verifyRequestFields(Course, [dates]),
    coursesController.updateCourse
  )
  .delete(verifyProfessor, coursesController.deleteCourse);

router.route("").get(verifyProfessor, coursesController.getAllCourses).post(
  verifyProfessor,
  //TODO: verifyRequestFields(Course, [dates]),
  coursesController.createCourse
);
module.exports = router;
