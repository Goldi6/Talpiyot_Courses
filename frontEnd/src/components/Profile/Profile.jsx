import { Container } from "@mui/material";
import { UserContext } from "Context/userContext";
import React, { useContext } from "react";
import UserData from "./UserData";
import UpdateProfile from "./UpdateProfile";

export default function Profile() {
  const { userData } = useContext(UserContext);

  return (
    <Container
      className="container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <UserData userData={userData.user} />

      <UpdateProfile />
    </Container>
  );
}
