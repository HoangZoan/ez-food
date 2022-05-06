import React from "react";
import MenuListLayout from "layouts/MenuListLayout";
import { Container } from "@mui/material";

const dummyData = [];

const HomeMenuList = () => {
  return (
    <MenuListLayout>
      <Container sx={{ py: 9 }}>HomeMenuList</Container>
    </MenuListLayout>
  );
};

export default HomeMenuList;
