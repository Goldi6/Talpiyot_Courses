import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";

import ProfileMenu from "./profileMenu";
import UserPagesNav from "./UserPagesNav";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { UserContext } from "Context/userContext";

function HeaderLoader() {
  const { userData } = React.useContext(UserContext);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex" }}>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                COURSES
              </Typography>
            </Box>
            {userData.user ? (
              <>
                <UserPagesNav />
                <ProfileMenu />
              </>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Typography textAlign="center">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                  >
                    Login
                  </NavLink>
                </Typography>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default HeaderLoader;
