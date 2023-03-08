const express = require("express");

const router = express.Router();
const profileController = require("../controllers/profileController");

router.patch(
  "/class/:classId/attend/:attendanceId",
  profileController.attendOnTime
);

router.patch("/attend/:attendanceId", profileController.attendAfterTime);

router.get("/courses", profileController.getUserCourses);

router.get("/schedule", profileController.getUserSchedule);

router.get("/class", profileController.getTodaysClassesForUser);

router.get("/absences", profileController.getAllUnattendedClasses);

router.post(
  "/attend/:attendanceId/absenceReason",
  profileController.postAbsenceReason
);

module.exports = router;
