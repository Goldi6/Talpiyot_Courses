const express = require("express");


const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

router.post("/:courseId", attendanceController.get_course_attendance);

router.get("", attendanceController.get_all_attendances);

module.exports = router;
