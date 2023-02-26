// import StudentRoute from "Routes/StudentRoute";
// import PrivetRoute from "Routes/professorRoute";
// import ProfessorRoute from "Routes/professorRoute";
// import PublicRoute from "Routes/publicRouter";
// import NotFound404 from "components/404/NotFound404";
// import Home from "components/Home/Home";
// import Layout from "components/Layout/Layout";
// import Login from "components/Login/Login";
// import ProfessorCourse from "components/Proffessor/Course/ProfessorCourse";
// import ProfessorCourses from "components/Proffessor/Courses/ProfessorCourses";
// import Students from "components/Proffessor/Students/Students";
// import Profile from "components/Profile/Profile";
// import StudentCourse from "components/Student/Course/StudentCourse";
// import StudentCourses from "components/Student/Courses/StudentCourses";
// import React from "react";
// import { Navigate } from "react-router-dom";

// export const routes = [
//   { path: "/", element: <Navigate to="/home" replace /> },
//   { path: "/home", element: <Home /> },
//   {
//     path: "/profile",
//     element: (
//       <PrivetRoute>
//         <Profile />
//       </PrivetRoute>
//     ),
//   },
//   {
//     path: "login",
//     element: (
//       <PublicRoute>
//         <Login />
//       </PublicRoute>
//     ),
//   },
//   {
//     path: "professor",
//     element: (
//       <ProfessorRoute>
//         <Layout />
//       </ProfessorRoute>
//     ),
//     children: [
//       { path: "courses", element: <ProfessorCourses /> },
//       { path: "course/:id", element: <ProfessorCourse /> },
//       { path: "students", element: <Students /> },
//     ],
//   },
//   {
//     path: "student",
//     element: (
//       <StudentRoute>
//         <Layout />
//       </StudentRoute>
//     ),
//     children: [
//       { path: "courses", element: <StudentCourses /> },
//       { path: "course/:id", element: <StudentCourse /> },
//     ],
//   },
//   { path: "*", element: <NotFound404 /> },
// ];
