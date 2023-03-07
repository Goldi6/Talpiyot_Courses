import React, { useEffect } from "react";
import { attendOnTime, getNextClassForUser } from "server/profile";
import { getSimpleDate, isNowBetweenTimes } from "utils/dates";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StudentClass() {
  const navigate = useNavigate();

  const [schedule, setSchedule] = React.useState([]);
  //
  const [now, setNow] = React.useState(new Date());
  //
  setInterval(() => setNow(new Date()), 60000);
  useEffect(() => {
    let render = true;
    if (render)
      getNextClassForUser()
        .then((data) => setSchedule(data))
        .catch((err) => {
          navigate(`/error/${err.message}`);
        });
    return () => {
      render = false;
    };
  }, [navigate]);
  console.log(schedule);
  function onClickAttend(classId, attendanceId) {
    attendOnTime(classId, attendanceId).then((data) => {
      if (data.attended) {
        const updatedSchedule = schedule.map((classNow) => {
          if (classNow.attendanceId === attendanceId) {
            classNow.attended = data.attended;
          }
          return classNow;
        });
        setSchedule([...updatedSchedule]);
      }
    });
  }

  return (
    <div>
      <h2>Todays Classes</h2>
      <h2 style={{ textAlign: "center" }}>{getSimpleDate(new Date())}</h2>
      {schedule.length > 0 ? (
        schedule.map((todaysClass, i) => {
          return (
            <div key={i} style={{ borderBottom: "1px solid black" }}>
              <h3>{todaysClass.name}</h3>
              <div>
                <p>{todaysClass.dateAndTime.time}</p>
              </div>
              {isNowBetweenTimes(
                todaysClass.startTime,
                todaysClass.endTime,
                now
              ) && (
                <div
                  style={{
                    display: "flex",
                    padding: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    disabled={todaysClass.attended}
                    variant="contained"
                    onClick={() => {
                      onClickAttend(todaysClass.id, todaysClass.attendanceId);
                    }}
                  >
                    {todaysClass.attended ? "In class" : "Attend"}
                  </Button>
                  <br />
                  <br />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <Typography textAlign="center">No classes for today</Typography>
      )}
    </div>
  );
}
