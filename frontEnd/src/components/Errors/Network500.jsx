import { Container } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
export default function NetworkError() {
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
      <Typography variant="h1">500</Typography>
      <Typography variant="h3">connection error, try again later</Typography>
    </Container>
  );
}
