import React from "react";
import UserContextProvider from "../Context/userContext";
import HeaderLoader from "components/Header/HeaderLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./publicRouter";
import Login from "components/Login/Login";
import NotFound404 from "components/Errors/NotFound404";
import ProfessorRoute from "./professorRoute";
import ProfessorCourses from "components/Professor/Courses/ProfessorCourses";
import ProfessorCourseLoader from "components/Professor/Course/ProfessorCourse_Loader";
import Students from "components/Professor/Students/Students";
import StudentRoute from "./StudentRoute";
import StudentCourses from "components/Student/Courses/StudentCourses";
import Layout from "components/Layout/Layout";
import Home from "components/Home/Home";
import PrivetRoute from "./privetRoute";
import Profile from "components/Profile/Profile";
import StudentSchedule from "components/Student/schedule/StudentSchedule";
import StudentClass from "components/Student/class/StudentClass";
import UnattendedPage from "components/Student/unattended/UnattendedPage";
import AttendancePage from "../components/Professor/attendance/AttendancePage";
import NetworkError from "../components/Errors/Network500";
import ErrorRedirection from "components/Errors/ErrorRedirection";

const load = () => {
  console.log("loader");
  return "loader";
};

export default function AppRouter() {
  return (
    <>
      <UserContextProvider>
        <HeaderLoader />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/profile"
            element={
              <PrivetRoute>
                <Profile />
              </PrivetRoute>
            }
          ></Route>

          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="professor"
            element={
              <ProfessorRoute>
                <Layout />
              </ProfessorRoute>
            }
          >
            <Route
              loader={load}
              path=""
              element={<Navigate to="courses" replace />}
            ></Route>
            <Route path="courses" element={<ProfessorCourses />}></Route>
            <Route path="attendance" element={<AttendancePage />}></Route>
            <Route
              path="courses/:id"
              element={<ProfessorCourseLoader />}
            ></Route>
            <Route path="students" element={<Students />}></Route>
          </Route>
          <Route
            path="student"
            element={
              <StudentRoute>
                <Layout />
              </StudentRoute>
            }
          >
            <Route
              loader={load}
              index
              path=""
              element={<Navigate to="courses" replace />}
            ></Route>
            <Route index path="courses" element={<StudentCourses />}></Route>
            <Route path="schedule" element={<StudentSchedule />}></Route>
            <Route path="unattended" element={<UnattendedPage />}></Route>
            <Route path="class" element={<StudentClass />}></Route>
          </Route>

          <Route path="*" element={<NotFound404 />} />
          <Route path="error/:error" element={<ErrorRedirection />} />
          <Route path="500" element={<NetworkError />} />
        </Routes>
        {/* <ResponsiveDrawer /> */}
      </UserContextProvider>
    </>
  );
}
