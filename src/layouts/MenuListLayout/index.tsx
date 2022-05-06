import React from "react";
import { Box, Typography } from "@mui/material";

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
        <Box
          borderRadius={(theme) => theme.shape.borderRadius}
          paddingY={3}
          paddingX={5}
          sx={{ border: "2px solid white" }}
        >
          <Typography textTransform="uppercase" variant="h2" color="white">
            Bánh mỳ
          </Typography>
        </Box>
      </Box>
      {children}
    </div>
  );
};

export default MenuListLayout;
