import React from "react";
import { Box } from "@mui/material";
import BoxedHeading from "components/UI/BoxedHeading";

interface MenuListLayoutProps {
  children: React.ReactNode;
  onTop?: boolean;
  title: string;
}

const MenuListLayout = ({ children, onTop, title }: MenuListLayoutProps) => {
  return (
    <div>
      <Box pb={9} bgcolor="black" pt={(theme) => theme.spacing(onTop ? 13 : 9)}>
        <BoxedHeading content={title} sx={{ mb: 0 }} />
      </Box>
      {children}
    </div>
  );
};

export default MenuListLayout;
