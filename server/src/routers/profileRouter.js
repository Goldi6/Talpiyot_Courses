const express = require("express");

const router = express.Router();
const profileController = require("../controllers/profileController");

router.patch(
  "/schedule/:classId/attend/:attendanceId",
  profileController.attendOnTime
);

router.patch("/attend/:attendanceId", profileController.attendAfterTime);

router.get("/courses", profileController.getUserCourses);

router.get("/schedule", profileController.getUserSchedule);

router.get("/class", profileController.getTodaysClassesForUser);

router.get("/unattendedClasses", profileController.getAllUnattendedClasses);

router.post(
  "/attendance/:attendanceId/absenceReason",
  profileController.postAbsenceReason
);

module.exports = router;
