const User = require("../models/userModel");
const Course = require("../models/courseModel");

const Attendant = require("../models/attendantsModel");
const { createSetWithNewValue } = require("../utils/funcs");

const conn = require("../db/mongoose");

exports.post_addStudentToCourse = async (req, res, next) => {
  const course_id = req.courseId;
  // const course_id = req.params["courseId"];

  const student_id = req.params["studentId"];

  console.log("courseId: ", course_id);

  const session = await conn.startSession();

  try {
    const course = await Course.findById(course_id).populate({
      path: "schedule",
      select: "_id date",
    });

    const student = await User.findById(student_id);

    if (!course || !student) {
      return next("DataNotFound", {
        courseError: course,
        studentError: student,
      });
    }

    session.startTransaction();

    const courseStudents_SET = createSetWithNewValue(
      course.students,
      student_id
    );

    course.students = Array.from(courseStudents_SET);
    await course.save({ session });

    const userCourses_set = createSetWithNewValue(student.courses, course_id);
    student.courses = Array.from(userCourses_set);
    await student.save({ session });

    const dataForNewDocs = course.schedule.map((scheduleData) => {
      return new Attendant({
        courseId: course_id,
        student: student._id,
        class: scheduleData._id,
        date: scheduleData.date,
      });
    });

    await Attendant.insertMany(dataForNewDocs, { session });
    await course.populate("students schedule");

    await session.commitTransaction();
    res.send(course);
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

exports.delete_removeStudentFromCourse = async (req, res, next) => {
  // const course_id = req.params["courseId"];
  const course_id = req.courseId;
  const student_id = req.params["studentId"];

  const session = await conn.startSession();
  //

  try {
    const course = await Course.findById(course_id);
    if (!course) {
      session.endSession();
      return next(course);
    }
    const filtered = course.students.filter((id) => {
      return id.toString() !== student_id;
    });

    session.startTransaction();

    await Attendant.deleteMany(
      { courseId: course_id, student: student_id },
      { session }
    );

    course.students = [...filtered];

    await course.save({ session });
    await course.populate("students schedule");

    await session.commitTransaction();
    res.send(course);
  } catch (err) {
    await session.abortTransaction();

    next(err);
  } finally {
    session.endSession();
  }
};
