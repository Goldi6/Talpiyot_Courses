const { isNowBetweenTimes } = require("../utils/dates");

const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");

exports.postAbsenceReason = async (req, res, next) => {
  const _id = req.params.attendanceId;
  const reason = req.body.reason;
  try {
    const attendant = await Attendant.findById(_id);
    if (!attendant) next(new Error("Attendant not found"));
    if (!attendant.attended) {
      attendant.reason = reason;
      attendant.timeAttended = new Date();
      await attendant.save();
    }
    res.send(true);
  } catch (err) {
    next(err);
  }
};

exports.getAllUnattendedClasses = async (req, res, next) => {
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
};

exports.getTodaysClassesForUser = async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const courses = req.user.courses.map((course) => {
    return course.toString();
  });

  const todaysClassQuery = {
    $and: [{ courseId: { $in: courses } }, { date: today }],
  };
  try {
    const schedule = await Schedule.find(todaysClassQuery).sort({
      startTime: 1,
    });

    const getAttendanceSchedulePromises = schedule.map(
      async (classSchedule) => {
        const attendDoc = await Attendant.findOne({
          class: classSchedule,
          student: req.user._id,
        }).populate("class");

        return attendDoc;
      }
    );

    const attendanceSchedule = await Promise.all(getAttendanceSchedulePromises);

    res.send(attendanceSchedule);
  } catch (error) {
    next(error);
  }
};

exports.getUserSchedule = async (req, res, next) => {
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
};

exports.getUserCourses = async (req, res, next) => {
  try {
    await req.user.populate({
      path: "courses",
      populate: {
        path: "schedule",
        model: "Schedule",
        select: "date startTime endTime",
      },
    });

    res.send(req.user);
  } catch (error) {
    next(error);
  }
};

exports.attendOnTime = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.classId);
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
};

exports.attendAfterTime = async (req, res, next) => {
  try {
    const attendDoc = await Attendant.findById(req.params.attendanceId);
    if (!attendDoc) return next(attendDoc);

    if (attendDoc.attended) return res.send({ attended: true });

    attendDoc.attended = true;
    attendDoc.timeAttended = new Date();
    attendDoc.save();
    return res.send({ attended: attendDoc.attended });
  } catch (error) {
    next(error);
  }
};
