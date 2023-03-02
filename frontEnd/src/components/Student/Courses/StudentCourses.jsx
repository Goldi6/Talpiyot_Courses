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
