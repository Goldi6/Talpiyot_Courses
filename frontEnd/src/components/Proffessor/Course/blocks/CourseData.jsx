import React, { useContext } from "react";
import { CourseContext } from "../../../../Context/courseContext";
import { Button, Stack } from "@mui/material";

export default function CourseData({
  setShowEditStudents,
  setShowEditSchedule,
  setShowClassAttendance,
}) {
  const { courseData } = useContext(CourseContext);

  const onClickAddClasses = () => {
    setShowEditSchedule(true);
    setShowEditStudents(false);
    setShowClassAttendance(false);
  };
  const onClickAddStudents = () => {
    setShowEditSchedule(false);
    setShowEditStudents(true);
    setShowClassAttendance(false);
  };
  const onClickShowAttendance = () => {
    setShowEditSchedule(false);
    setShowEditStudents(false);
    setShowClassAttendance(true);
  };

  return (
    <>
      <Stack gap="1rem">
        <h1 style={{ textAlign: "center" }}> {courseData.name}</h1>
        <h3 style={{ margin: 0, textAlign: "center" }}>
          {courseData.startDate} - {courseData.endDate}
        </h3>
        <Stack
          direction="row"
          spacing="1rem"
          alignItems="center"
          justifyContent="center"
        >
          <Button variant="contained" onClick={onClickShowAttendance}>
            Show Attendance
          </Button>
          <Button variant="contained" onClick={onClickAddClasses}>
            Add classes
          </Button>
          <Button variant="contained" onClick={onClickAddStudents}>
            Add students
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
