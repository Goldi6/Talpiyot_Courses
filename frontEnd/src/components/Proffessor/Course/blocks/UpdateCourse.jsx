import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import AddClassesForm from "../addClasses/AddClassesForm";
import AddStudentsForm from "../addStudent/AddStudentsForm";

export default function UpdateCourse({ showEditSchedule, showEditStudents }) {
  return (
    <>
      {showEditSchedule && <AddClassesForm />}
      {showEditStudents && <AddStudentsForm />}
    </>
  );
}
