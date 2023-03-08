const Course = require("../models/courseModel");
const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");

const conn = require("../db/mongoose");

exports.addClassToCourseSchedule = async (req, res, next) => {
  //const _id = req.params["courseId"];
  const _id = req.courseId;
  const ScheduleData = req.body;

  const session = await conn.startSession();

  try {
    const course = await Course.findById(_id);

    const newSchedule = new Schedule({ ...ScheduleData, name: course.name });
    //

    //
    course.schedule.push(newSchedule._id);

    session.startTransaction();
    await newSchedule.save({ session });
    await course.save({ session });
    //

    const attendancesDocs = [];
    for (const studentId of course.students) {
      const attendance = new Attendant({
        courseId: _id,
        student: studentId,
        class: newSchedule._id,
        date: newSchedule.date,
      });

      attendancesDocs.push(attendance);
    }

    await Attendant.insertMany(attendancesDocs, { session });
    //
    await course.populate("schedule");

    await session.commitTransaction();
    return res.send(course);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

exports.removeClassFromCourseSchedule = async (req, res, next) => {
  //const course_id = req.params["courseId"];
  const course_id = req.courseId;
  const schedule_id = req.params["classId"];

  const session = await conn.startSession();

  try {
    const course = await Course.findById(course_id);
    if (!course) {
      session.endSession();
      return next(course);
    }
    course.schedule = course.schedule.filter((id) => id !== schedule_id);
    //

    session.startTransaction();

    await course.save({ session });
    await Schedule.findByIdAndDelete(schedule_id, { session });
    //
    await Attendant.deleteMany(
      { courseId: course_id, class: schedule_id },
      { session }
    );

    await session.commitTransaction();

    await course.populate("schedule");
    return res.send(course);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
