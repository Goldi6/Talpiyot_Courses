import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { UserContext } from "Context/userContext";
import { deleteUserFromCookie } from "Cookies/cookies";
import { userLogout_Action } from "Reducers/Actions/UserActions";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "server/auth";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);

  //MUI
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log(anchorElUser);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //END_MUI

  const onClickLogout = () => {
    logout()
      .then((message) => {
        console.log(message);
        userDispatch(userLogout_Action());
        deleteUserFromCookie();
        navigate("/home");
      })
      .catch((error) => {
        userDispatch(userLogout_Action());
        deleteUserFromCookie();
        console.log(error);
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">
              <Link to={`/profile`} className="nav-link">
                Profile
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem onClick={onClickLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
