import { Typography } from "@mui/material";
import React from "react";
import { getUserCurses } from "server/profile";
import { getSimpleDate } from "utils/dates";
import ScheduleList from "./ScheduleList";
import { useNavigate } from "react-router-dom";

export default function StudentCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    let render = true;
    if (render)
      getUserCurses()
        .then((data) => {
          setCourses(data.courses);
        })
        .catch((err) => {
          navigate(`/error/${err.message}`);
        });
    return () => {
      render = false;
    };
  }, [navigate]);

  return (
    <div>
      <Typography variant="h3" textAlign="center">
        Courses{" "}
        <Typography color="secondary">
          You have <b>{courses.length}</b> courses
        </Typography>
      </Typography>
      {courses.length > 0 &&
        courses.map((course, i) => {
          return (
            <div key={i}>
              <Typography variant="h4">{course.name} </Typography>
              <div>
                <ScheduleList
                  scheduleArray={course.schedule}
                  courseId={course.id}
                  courseDates={`${getSimpleDate(course.startDate)} -
                  ${getSimpleDate(course.endDate)}`}
                ></ScheduleList>
              </div>
            </div>
          );
        })}
    </div>
  );
}
