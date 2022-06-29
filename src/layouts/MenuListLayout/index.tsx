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
      <Box
        sx={[{ py: { xs: 5, sm: 9 } }, !!onTop && { pt: { xs: 10, sm: 13 } }]}
        bgcolor="primary.light"
      >
        <BoxedHeading content={title} sx={{ mb: 0 }} />
      </Box>
      {children}
    </div>
  );
};

export default MenuListLayout;
