import React, { useContext, useState } from "react";
import { CourseContext } from "Context/courseContext";
import CourseData from "./blocks/CourseData";
import UpdateCourse from "./blocks/UpdateCourse";

export default function ProfessorCourse() {
  const [showEditStudents, setShowEditStudents] = useState(false);
  const [showEditSchedule, setShowEditSchedule] = useState(true);
  const { courseData } = useContext(CourseContext);
  console.log("NOW");
  console.log(courseData);
  return (
    <>
      {courseData !== null && (
        <div className="flex-book">
          <CourseData
            setShowEditStudents={setShowEditStudents}
            setShowEditSchedule={setShowEditSchedule}
          />
          <UpdateCourse
            showEditStudents={showEditStudents}
            showEditSchedule={showEditSchedule}
          />
        </div>
      )}
    </>
  );
}
