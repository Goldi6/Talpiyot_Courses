import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Container className="container">
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
}
