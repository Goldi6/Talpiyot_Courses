import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

//TODO :route security
export default function PrivetRoute({ children }) {
  const { userData } = useContext(UserContext);

  if (userData.user === null) {
    return <Navigate to="/login" state={{ needToLogin: true }} />;
  }
  return children;
}
