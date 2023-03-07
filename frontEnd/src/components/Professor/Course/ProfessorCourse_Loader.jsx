import React from "react";
import { useParams } from "react-router-dom";
import CourseContextProvider from "Context/courseContext";

import ProfessorCourse from "./ProfessorCourse";

export default function ProfessorCourseLoader() {
  const { id } = useParams();

  return (
    <CourseContextProvider id={id}>
      <ProfessorCourse />
    </CourseContextProvider>
  );
}
