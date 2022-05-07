import React from "react";
import { Box } from "@mui/material";
import BoxedHeading from "../../components/BoxedHeading";

interface MenuListLayoutProps {
  children: React.ReactNode;
  onTop?: boolean;
}

const MenuListLayout = ({ children, onTop }: MenuListLayoutProps) => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        pb={9}
        bgcolor="black"
        pt={(theme) => theme.spacing(onTop ? 13 : 9)}
      >
        <BoxedHeading content="Bánh mỳ" />
      </Box>
      {children}
    </div>
  );
};

export default MenuListLayout;
