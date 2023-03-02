const express = require("express");
const User = require("../models/userModel");
const Course = require("../models/courseModel");

const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");
const { createSetWithNewValue } = require("../utils/funcs");

const router = express.Router();

router.post(
  "/students/:studentId",

  async (req, res, next) => {
    console.log("OK");
    const course_id = req.params["courseId"];
    const student_id = req.params["studentId"];
    //get course then populate
    const course = await Course.findById(course_id).populate({
      path: "schedule",
      select: "_id date",
    });

    if (!course) next(course);

    // const courseStudents_SET = new Set();
    // const courseStudents_idsString = [...course.students].map((id) => {
    //   courseStudents_SET.add(id.toString());
    //   return id.toString();
    // });

    // courseStudents_SET.add(student_id);
    const courseStudents_SET = createSetWithNewValue(
      course.students,
      student_id
    );

    course.students = Array.from(courseStudents_SET);

    await course.save();

    const student = await User.findById(student_id);
    // if (student.courses.length > 0) {
    const useCourses_set = createSetWithNewValue(student.courses, course_id);
    student.courses = Array.from(useCourses_set);
    // } else {
    //   student.courses = [course_id];
    // }

    await student.save();
    //FIXME:
    //?? swipe with schedule

    const dataForNewDocs = course.schedule.map((scheduleData) => {
      return new Attendant({
        courseId: course_id,
        student: student._id,
        class: scheduleData._id,
        date: scheduleData.date,
      });
    });

    await Attendant.insertMany(dataForNewDocs);

    await course.populate("students schedule");
    res.send(course);
  }
);

router.delete(
  "/students/:studentId",

  async (req, res, next) => {
    //FIXME

    const course_id = req.params["courseId"];
    const student_id = req.params["studentId"];
    //
    const course = await Course.findById(course_id);

    if (!course) next(course);

    const filtered = course.students.filter((id) => {
      return id.toString() !== student_id;
    });
    //NOTE!!!did not remove course from student
    await Attendant.deleteMany({ courseId: course_id, student: student_id });
    course.students = [...filtered];
    await course.save();
    await course.populate("students schedule");
    res.send(course);
    //add ids of students and courses
  }
);

router.post(
  "/class",

  //verifyRequestFields(Schedule),
  async (req, res, next) => {
    const _id = req.params["courseId"];
    const ScheduleData = req.body;

    try {
      const course = await Course.findById(_id);
      const newSchedule = new Schedule({ ...ScheduleData, name: course.name });
      //

      //
      course.schedule.push(newSchedule._id);
      await newSchedule.save();
      await course.save();
      //

      for (const studentId of course.students) {
        const attendance = new Attendant({
          courseId: _id,
          student: studentId,
          class: newSchedule._id,
          date: newSchedule.date,
        });
        await attendance.save();
      }
      //
      await course.populate("schedule");
      return res.send(course);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/class/:class-id",

  async (req, res, next) => {
    console.log(req.user);
    const course_id = req.params["courseId"];
    const schedule_id = req.params["class-id"];

    try {
      const course = await Course.findById(course_id);
      course.schedule = course.schedule.filter((id) => id !== schedule_id);
      //
      await course.save();
      await Schedule.findByIdAndDelete(schedule_id);
      //
      await Attendant.deleteMany({ courseId: course_id, class: schedule_id });

      await course.populate("schedule");
      return res.send(course);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
