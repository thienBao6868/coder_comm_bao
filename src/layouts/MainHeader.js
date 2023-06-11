import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../components/Logo";
import { Avatar, Divider } from "@mui/material";
import useAuth from "../hook/useAuth";
import {  Link as RouterLink, useNavigate } from "react-router-dom";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      handleCloseMenu();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle" noWrap>
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dotted" }} />
      <MenuItem
        onClick={handleCloseMenu}
        sx={{ mx: 1 }}
        component={RouterLink}
        to="/"
      >
        My Profile
      </MenuItem>
      <MenuItem
        onClick={handleCloseMenu}
        sx={{ mx: 1 }}
        component={RouterLink}
        to="/account"
      >
        Account Setting
      </MenuItem>
      <Divider sx={{ borderStyle: "dotted" }} />
      <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Coder comm
          </Typography>
          <Avatar onClick={handleOpenMenu} />
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
