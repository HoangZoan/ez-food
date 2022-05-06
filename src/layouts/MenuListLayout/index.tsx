import React from "react";
import { Box, Typography } from "@mui/material";
import BoxedHeading from "../../components/BoxedHeading";

interface MenuListLayoutProps {
  children: React.ReactNode;
}

const MenuListLayout = ({ children }: MenuListLayoutProps) => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        py={9}
        bgcolor={(theme) => theme.palette.secondary.main}
      >
        <BoxedHeading content="Bánh mỳ" />
      </Box>
      {children}
    </div>
  );
};

export default MenuListLayout;
