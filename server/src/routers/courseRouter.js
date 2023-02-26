const express = require("express");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const auth = require("../middleware/auth");
const verifyProfessor = require("../middleware/verifyProfessor");
const Schedule = require("../models/scheduleModel");
const Attendant = require("../models/attendantsModel");

// const { verifyRequestFields } = require("../middleware/modelFieldsVerifiers");

const router = new express.Router();

router.patch(
  "/course/addStudent/:course_id/:student_id",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    console.log("here");
    const course_id = req.params.course_id;
    const student_id = req.params.student_id;

    const course = await Course.findById(course_id).populate({
      path: "schedule",
      select: "_id date",
    });
    if (!course) next(course);
    //
    //
    const courseStudents_SET = new Set();
    const courseStudents_idsString = [...course.students].map((id) => {
      courseStudents_SET.add(id.toString());
      return id.toString();
    });
    if (!courseStudents_idsString.includes(student_id)) {
      const course_students_ARRAY = [...courseStudents_idsString].push(
        student_id
      );
      courseStudents_SET.add(student_id);

      course.students = Array.from(courseStudents_SET);

      await course.save();

      const user = await User.findOne({ _id: student_id });
      if (user.courses.length > 0) {
        const useCourses_set = new Set();
        [...user.courses].map((id) => {
          useCourses_set.add(id.toString());
        });

        useCourses_set.add(course_id);

        user.courses = Array.from(useCourses_set);
      } else {
        user.courses = [course_id];
      }

      await user.save();
      //FIXME:
      //?? swipe with schedule

      const dataForNewDocs = course.schedule.map((scheduleData) => {
        return {
          courseId: course_id,
          student: user._id,
          class: scheduleData._id,
          date: scheduleData.date,
        };
      });

      await Attendant.insertMany(dataForNewDocs);
    }

    await course.populate("students schedule");
    res.send(course);
    //add ids of students and courses
  }
);

router.patch(
  "/course/removeStudent/:course_id/:student_id",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    //FIXME
    //remove student from course
    //remove course from student
    //delete attendant docs//??
    console.log("hereDELETE");
    const course_id = req.params.course_id;
    const student_id = req.params.student_id;
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

router.get("/course/:id", auth, async (req, res, next) => {
  const _id = req.params.id;

  try {
    const course = await Course.findById(_id);
    if (!course) {
      next(course);
    }

    await course.populate("students schedule");
    res.send(course);
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/course/:id",
  auth,
  verifyProfessor,

  async (req, res, next) => {
    console.log("DELETE");
    const _id = req.params.id;

    try {
      await Course.findByIdAndDelete(_id);
      await Schedule.deleteMany({ courseId: _id });
      await Attendant.deleteMany({ courseId: _id });

      res.send("Course and all its data is deleted!");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/course",
  auth,
  verifyProfessor,
  //verifyRequestFields(Course, [dates]),

  async (req, res, next) => {
    const courseData = req.body;
    //const updateStudents = courseData.students !== undefined;

    try {
      const course = new Course(courseData);
      await course.save();
      console.log(course);
      res.send(course);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/course/:id",
  auth,
  verifyProfessor,
  //verifyRequestFields(Course, [dates]),

  async (req, res, next) => {
    const updateData = req.body;
    console.log(updateData);
    const _id = req.params.id;
    console.log("Course patch");
    try {
      const course = await Course.findOneAndUpdate({ _id }, updateData, {
        new: true,
        runValidators: true,
      });
      console.log(course);
      await course.save();

      res.send(course);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/course/addClass/:courseID",
  auth,
  verifyProfessor,
  //verifyRequestFields(Schedule),
  async (req, res, next) => {
    const _id = req.params.courseID;
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
  "/course/removeClass/:courseID/:scheduleID",
  auth,
  verifyProfessor,
  async (req, res, next) => {
    console.log(req.user);
    const course_id = req.params.courseID;
    const schedule_id = req.params.scheduleID;

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
