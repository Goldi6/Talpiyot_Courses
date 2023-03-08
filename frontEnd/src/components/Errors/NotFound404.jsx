import { Container } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
export default function NotFound404() {
  return (
    <Container
      className="container"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-4rem",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">Requested page not found</Typography>
    </Container>
  );
}
