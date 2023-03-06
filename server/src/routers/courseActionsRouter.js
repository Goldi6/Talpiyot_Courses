const express = require("express");

const courseStudentActionsController = require("../controllers/courseStudentActionsController");
const courseClassesActionsController = require("../controllers/courseScheduleActionsController");

const router = express.Router();

//TODO : fix routes after model change

router
  .route("/students/:studentId")
  .post(courseStudentActionsController.post_addStudentToCourse)
  .delete(courseStudentActionsController.delete_removeStudentFromCourse);

router.post(
  "/class",
  //verifyRequestFields(Schedule),
  courseClassesActionsController.post_addClassToCourse
);

router.delete(
  "/class/:classId",
  courseClassesActionsController.delete_removeClassFromCourse
);

module.exports = router;
