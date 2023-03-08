const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

router.post("/:courseId", attendanceController.getCourseAttendance);

router.get("", attendanceController.getAllAttendances);

module.exports = router;
