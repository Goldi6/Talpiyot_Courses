// //TODO
const { isNowBetweenTimes } = require("../utils/dates");

// // router.patch("schedule/:id/:student", auth, async (req, res, next) => {
// //   try {
// //     //if time update else reason update
// //   } catch (error) {
// //     next(error);
// //   }
// // });

const express = require("express");
const auth = require("../middleware/auth");
const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");

const router = express.Router();

//TEST
router.patch("/student/attendance/reason/:id", auth, async (req, res, next) => {
  const _id = req.params.id;
  const reason = req.body.reason;
  try {
    const attendant = await Attendant.findById(_id);
    if (!attendant) next(new Error("Attendant not found"));
    if (!attendant.attended) {
      attendant.reason = reason;
      attendant.timeAttended = new Date();
      await attendant.save();
    }
    // await attendant.populate("class");
    res.send(true);
  } catch (err) {
    next(err);
  }
});

//TEST //fix error
router.get("/student/unattended", auth, async (req, res, next) => {
  try {
    const today = new Date();

    const query = {
      $and: [
        { attended: false },
        { date: { $lt: today } },
        { student: req.user._id },
        { reason: { $exists: false, $not: { $type: "null" } } },
      ],
    };

    const unattended = await Attendant.find(query).populate({
      path: "class",
      options: { virtuals: false },
    });

    if (!unattended) return next(unattended);

    if (unattended.length === 0) return res.send("AllClassesAttended");

    res.send(unattended);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/student/attend/:classId/:attendanceId",
  auth,
  async (req, res, next) => {
    try {
      const schedule = await Schedule.findById(req.params.classId);
      //if time update else reason update
      if (isNowBetweenTimes(schedule.startTime, schedule.endTime)) {
        console.log("IN time");

        const attendDoc = await Attendant.findById(req.params.attendanceId);
        if (!attendDoc) return next(attendDoc);

        if (attendDoc.attended) return res.send({ attended: true });

        attendDoc.attended = true;
        attendDoc.timeAttended = new Date();
        attendDoc.save();
        return res.send({ attended: attendDoc.attended });
      }
      res.send({ attended: false });
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/student/attend/:attendanceId", auth, async (req, res, next) => {
  try {
    const attendDoc = await Attendant.findById(req.params.attendanceId);
    if (!attendDoc) return next(attendDoc);

    if (attendDoc.attended) return res.send({ attended: true });

    attendDoc.attended = true;
    attendDoc.timeAttended = new Date();
    attendDoc.save();
    return res.send({ attended: attendDoc.attended });
    res.send({ attended: false });
  } catch (error) {
    next(error);
  }
});

router.get("/student/courses", auth, async (req, res, next) => {
  try {
    //find the course that on click redirects to get course date details page
    await req.user.populate({
      path: "courses",
      populate: { path: "schedule", model: "Schedule" },
    });

    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});
router.get("/student/schedule", auth, async (req, res, next) => {
  try {
    const courses = req.user.courses.map((course) => {
      return course.toString();
    });

    const schedule = await Schedule.find({
      courseId: { $in: courses },
    }).sort({ startTime: 1 });

    res.send(schedule);
  } catch (error) {
    next(error);
  }
});

router.get("/class", auth, async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const courses = req.user.courses.map((course) => {
    return course.toString();
  });

  const todaysClassQuery = {
    $and: [{ courseId: { $in: courses } }, { date: today }],
  };

  const schedule = await Schedule.find(todaysClassQuery).sort({ startTime: 1 });
  const ready = false;

  const getAttendanceSchedulePromises = schedule.map(async (classSchedule) => {
    const attendDoc = await Attendant.findOne({
      class: classSchedule,
      student: req.user._id,
    }).populate("class");

    return attendDoc;
  });

  const attendanceSchedule = await Promise.all(getAttendanceSchedulePromises);
  // const updatedSchedule = schedule.map(async (scheduledClass) => {
  //   const attendance = scheduledClass.getStudentAttendance(req.user._id);

  //   console.log(attendance);
  //   return attendance;
  // });
  res.send(attendanceSchedule);
});

module.exports = router;
