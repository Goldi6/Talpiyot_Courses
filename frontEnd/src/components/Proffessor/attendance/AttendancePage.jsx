import React, { useEffect, useState } from "react";
import { Diversity1 } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { getAttendanceData } from "server/atttendance";
import CustomizedCollapse from "./ThreeLevelSlideList";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    let requested = true;
    if (requested) {
      getAttendanceData().then((data) => {
        setAttendanceData(data);
        console.log(attendanceData);
        console.log(data);
      });
    }
    return () => {
      requested = false;
    };
  }, []);

  return (
    <>
      <Typography variant="h2" style={{ textAlign: "center" }}>
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
