const express = require("express");

const courseStudentActionsController = require("../controllers/courseStudentActionsController");
const courseClassesActionsController = require("../controllers/courseScheduleActionsController");

const router = express.Router();

//TODO : fix routes after model change

router
  .route("/students/:studentId")
  .post(courseStudentActionsController.addStudentToCourse)
  .delete(courseStudentActionsController.removeStudentFromCourse);

router.post("/class", courseClassesActionsController.addClassToCourseSchedule);

router.delete(
  "/class/:classId",
  courseClassesActionsController.removeClassFromCourseSchedule
);

module.exports = router;
