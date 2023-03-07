import React from "react";
import { getUserSchedule } from "server/profile";
import { getSimpleTime, getSimpleDate } from "../../../utils/dates";
import { useNavigate } from "react-router-dom";

export default function StudentSchedule() {
  const [schedule, setSchedule] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    let render = true;
    if (render)
      getUserSchedule()
        .then((data) => setSchedule(data))
        .catch((err) => navigate(`/error/${err.message}`));
    return () => {
      render = false;
    };
  }, [navigate]);

  return (
    <div>
      {schedule.length > 0 &&
        schedule.map((course, i) => {
          return (
            <div key={i} style={{ borderBottom: "1px solid black" }}>
              <h3>{course.name}</h3>
              <div>
                <p>{getSimpleDate(course.date)}</p>
                <p>
                  {getSimpleTime(course.startTime)} -{" "}
                  {getSimpleTime(course.endTime)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
