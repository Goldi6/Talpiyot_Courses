const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

router.get("/:courseId", attendanceController.getCourseAttendance);

router.get("", attendanceController.getAllAttendances);

module.exports = router;
