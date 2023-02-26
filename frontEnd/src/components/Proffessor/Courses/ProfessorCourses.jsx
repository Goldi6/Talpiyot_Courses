import React from "react";
import CreateCourseForm from "./CreateCourse";
import { Box, Grid } from "@mui/material";
import CoursesList from "./CoursesList";
import CoursesContextProvider from "Context/CoursesContext";
import { useLoaderData } from "react-router-dom";

export default function ProfessorCourses() {
  return (
    <>
      <CoursesContextProvider>
        <Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CreateCourseForm />
            </Grid>
            <Grid item xs={12} md={6}>
              <CoursesList />
            </Grid>
          </Grid>
        </Box>
      </CoursesContextProvider>
    </>
  );
}
