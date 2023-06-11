import React from "react";
import logoCoder from "../media/logoCoder.png";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ height: "40px", width: "40px",...sx}}>
      <img src={logoCoder} alt="LogoCoderSchool" width="100%"/>
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to={"/"}>{logo}</RouterLink>;
}

export default Logo;

