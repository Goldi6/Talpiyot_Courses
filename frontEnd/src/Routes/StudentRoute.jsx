import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

//TODO :route security
export default function PrivetRoute({ children }) {
  const { userData } = useContext(UserContext);

  if (userData.user === null) {
    return <Navigate to="/login" state={{ needToLogin: true }} />;
  } else if (userData.user.role !== "student") {
    return <Navigate to="/404" />;
  } else {
    <Navigate to="/schedule" replace />;
  }
  return children;
}
