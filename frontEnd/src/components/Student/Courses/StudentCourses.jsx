import { Typography } from "@mui/material";
import React from "react";
import { getUserCurses } from "server/profile";
import { getSimpleDate } from "utils/dates";

export default function StudentCourses() {
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    let render = true;
    if (render) getUserCurses().then((data) => setCourses(data.courses));
    return () => {
      render = false;
    };
  }, []);

  return (
    <div>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Courses{" "}
        <Typography color="primary">
          You have <b>{courses.length}</b> courses
        </Typography>
      </Typography>
      {courses.length > 0 &&
        courses.map((course, i) => {
          return (
            <div key={i}>
              <h3>{course.name}</h3>
              <div>
                <p>Start date: {getSimpleDate(course.startDate)}</p>
                <p>End date: {getSimpleDate(course.endDate)}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
