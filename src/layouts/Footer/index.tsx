import React from "react";
import { AppBar, Toolbar, Container } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: "secondary.main",
      }}
      component="footer"
      position="relative"
    >
      <Toolbar>
        <Container sx={{ color: "white", py: 8 }}>Footer</Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
