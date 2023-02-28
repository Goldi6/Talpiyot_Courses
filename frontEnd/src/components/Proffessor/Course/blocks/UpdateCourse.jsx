import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import AddClassesForm from "../addClasses/AddClassesForm";
import AddStudentsForm from "../addStudent/AddStudentsForm";
import ClassAttendance from "../attendance/ClassAttendance";

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
