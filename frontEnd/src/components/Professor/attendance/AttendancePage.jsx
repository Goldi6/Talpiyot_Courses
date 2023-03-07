import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getAttendanceData } from "server/attendance";
import CustomizedCollapse from "./ThreeLevelSlideList";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    let requested = true;
    if (requested) {
      getAttendanceData().then((data) => {
        setAttendanceData(data);
      });
    }
    return () => {
      requested = false;
    };
  }, []);

  return (
    <>
      <Typography variant="h2" textAlign="center">
        Attendance table
      </Typography>
      {attendanceData.length > 0 ? (
        <CustomizedCollapse attendanceData={attendanceData} />
      ) : (
        "...loader"
      )}
    </>
  );
}
