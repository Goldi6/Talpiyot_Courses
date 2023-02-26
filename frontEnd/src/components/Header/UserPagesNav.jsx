import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

import { UserContext } from "Context/userContext";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function UserPagesNav() {
  const { userData } = useContext(UserContext);

  const pages = userData.user
    ? userData.user.role === "student"
      ? ["courses", "schedule", "class", "unattended"]
      : ["courses", "students", "attendance"]
    : [];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page, i) => {
            const href = "/" + userData.user.role + "/" + page;
            return (
              <MenuItem key={i} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      isActive ? " active nav-link" : "nav-link"
                    }
                  >
                    {page}
                  </NavLink>
                </Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => {
          const href = "/" + userData.user.role + "/" + page;

          return (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography textAlign="center">
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    isActive ? " active nav-link" : "nav-link"
                  }
                >
                  {page}
                </NavLink>
              </Typography>
            </Button>
          );
        })}
      </Box>
    </>
  );
}
