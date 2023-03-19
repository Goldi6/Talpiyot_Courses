import React, { useContext } from "react";
import { CourseContext } from "../../../../Context/courseContext";
import { Button, Stack } from "@mui/material";

export default function CourseData({
  setShowEditStudents,
  setShowEditSchedule,
  setShowClassAttendance,
}) {
  const { courseData } = useContext(CourseContext);

  const sections = [
    setShowEditStudents,
    setShowEditSchedule,
    setShowClassAttendance,
  ];
  function setSelectionRange(num) {
    sections.forEach((func, i) => {
      if (num.toString() === i.toString()) func(true);
      else {
        func(false);
      }
    });
  }

  function onClickSetSection(e) {
    setSelectionRange(e.target.value);
  }



  const buttonStyle = { fontSize: "0.7rem" };

  return (
    <>
      <Stack gap="1">
        <h1 style={{ textAlign: "center" }}> {courseData.name}</h1>
        <h3 style={{ margin: 0, textAlign: "center" }}>
          {courseData.startDate} - {courseData.endDate}
        </h3>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={onClickSetSection}
            value={2}
          >
            Attendance
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={onClickSetSection}
            value={1}
          >
            Classes
          </Button>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={onClickSetSection}
            value={0}
          >
            Students
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
