import React, { useContext, useState } from "react";
import { CourseContext } from "Context/courseContext";
import CourseData from "./blocks/CourseData";
import UpdateCourse from "./blocks/UpdateCourse";

export default function ProfessorCourse() {
  const [showEditStudents, setShowEditStudents] = useState(false);
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [showClassAttendance, setShowClassAttendance] = useState(true);
  const { courseData } = useContext(CourseContext);

  return (
    <>
      {courseData !== null && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          <CourseData
            setShowEditStudents={setShowEditStudents}
            setShowEditSchedule={setShowEditSchedule}
            setShowClassAttendance={setShowClassAttendance}
          />
          <UpdateCourse
            showEditStudents={showEditStudents}
            showEditSchedule={showEditSchedule}
            showClassAttendance={showClassAttendance}
          />
        </div>
      )}
    </>
  );
}
