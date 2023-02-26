import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

export default function PublicRoute({ children }) {
  const { userData } = useContext(UserContext);

  if (userData.user !== null) {
    return <Navigate to="/home" />;
  }
  return children;
}
