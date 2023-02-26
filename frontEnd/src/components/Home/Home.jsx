import React from "react";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        <Typography variant="h1">Home</Typography>
      </div>
    </>
  );
}
