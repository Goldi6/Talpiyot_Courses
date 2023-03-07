import React from "react";
import AddClassesForm from "../addClasses/AddClassesForm";
import AddStudentsForm from "../addStudent/AddStudentsForm";
import ClassAttendance from "../attendance/ClassAttendance";

//TODO: add auto schedule creation by week day and hour
export default function UpdateCourse({
  showEditSchedule,
  showEditStudents,
  showClassAttendance,
}) {
  return (
    <>
      {showEditSchedule && <AddClassesForm />}
      {showEditStudents && <AddStudentsForm />}
      {showClassAttendance && <ClassAttendance />}
    </>
  );
}
