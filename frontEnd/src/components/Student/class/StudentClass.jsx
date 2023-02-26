import { UserContext } from "Context/userContext";
import React, { useContext, useEffect } from "react";
import { attendStudent, getNextClass } from "server/student";
import { getSimpleDate, getSimpleTime, isNowBetweenTimes } from "utils/dates";
import { Button } from "@mui/material";

export default function StudentClass() {
  const { userData } = useContext(UserContext);
  const [schedule, setSchedule] = React.useState([]);
  //
  const [now, setNow] = React.useState(new Date());
  //
  setInterval(() => setNow(new Date()), 60000);
  useEffect(() => {
    let render = true;
    if (render) getNextClass().then((data) => setSchedule(data));
    return () => {
      render = false;
    };
  }, []);

  function onClickAttend(classId, attendanceId) {
    attendStudent(classId, attendanceId).then((data) => {
      if (data.attended) {
        const updatedSchedule = schedule.map((attendance) => {
          if (attendance.id === attendanceId) {
            attendance.attended = data.attended;
          }
          return attendance;
        });
        setSchedule([...updatedSchedule]);
      }
    });
  }

  return (
    <div>
      <h2>Todays Classes</h2>
      <h2 style={{ textAlign: "center" }}>{getSimpleDate(new Date())}</h2>
      {schedule.length > 0 &&
        schedule.map((classAttendance, i) => {
          return (
            <div key={i} style={{ borderBottom: "1px solid black" }}>
              <h3>{classAttendance.class.name}</h3>
              <div>
                <p>
                  {getSimpleTime(classAttendance.class.startTime)} -{" "}
                  {getSimpleTime(classAttendance.class.endTime)}
                </p>
              </div>
              {isNowBetweenTimes(
                classAttendance.class.startTime,
                classAttendance.class.endTime,
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
                    disabled={classAttendance.attended}
                    variant="contained"
                    onClick={() => {
                      onClickAttend(
                        classAttendance.class._id,
                        classAttendance._id
                      );
                    }}
                  >
                    {classAttendance.attended ? "In class" : "Attend"}
                  </Button>
                  <br />
                  <br />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
