import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Stack sx={{minHeight:"100vh", justifyContent:"center", alignItems:"center"}}>
      <Logo sx={{width: 90,height:50, mb:5}}/>
      <Stack padding={3}/>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
