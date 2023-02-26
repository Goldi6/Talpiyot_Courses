import React, { useContext } from "react";
import { CourseContext } from "../../../../Context/courseContext";
import { Button } from "@mui/material";
import NestedList from "../addStudent/ActiveStudentsList";
import ClassesList from "../addClasses/classesList/classesList";
import { getSimpleDate } from "utils/dates";

export default function CourseData({
  setShowEditStudents,
  setShowEditSchedule,
}) {
  const { courseData } = useContext(CourseContext);

  const onClickAddClasses = () => {
    setShowEditSchedule(true);
    setShowEditStudents(false);
  };
  const onClickAddStudents = () => {
    setShowEditSchedule(false);
    setShowEditStudents(true);
  };

  const [open, setOpen] = React.useState({
    Schedule: false,
    Students: false,
  });

  console.log("this");
  console.log(courseData.endDate);
  return (
    <>
      <div className="flex-half">
        <h1 className="half-text">Course: {courseData.name}</h1>
        <h3 className="half-text" style={{ margin: 0 }}>
          {courseData.startDate} - {courseData.endDate}
        </h3>
        <div>
          <h5>
            <Button variant="contained" onClick={onClickAddClasses}>
              Add classes
            </Button>

            <ClassesList />
          </h5>
        </div>
        <div>
          <Button variant="contained" onClick={onClickAddStudents}>
            Add students
          </Button>

          <div>
            <NestedList />
          </div>
        </div>
      </div>
    </>
  );
}
