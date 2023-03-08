import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getAllAttendances } from "server/attendance";
import CustomizedCollapse from "./ThreeLevelSlideList";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    let requested = true;
    if (requested) {
      getAllAttendances()
        .then((data) => {
          setAttendanceData(data);
        })
        .catch((err) => {
          navigate(`/error/${err.message}`);
        });
    }
    return () => {
      requested = false;
    };
  }, [navigate]);

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
