import React from "react";
import { Box } from "@mui/material";
import BoxedHeading from "components/UI/BoxedHeading";
import { useMediaQueries } from "hooks/useMediaQueries";

interface MenuListLayoutProps {
  children: React.ReactNode;
  onTop?: boolean;
  title: string;
}

const MenuListLayout = ({ children, onTop, title }: MenuListLayoutProps) => {
  const { smDown } = useMediaQueries();
  return (
    <div>
      <Box
        pb={smDown ? 5 : 9}
        bgcolor="primary.light"
        pt={(theme) => theme.spacing(onTop ? 13 : smDown ? 5 : 9)}
      >
        <BoxedHeading content={title} sx={{ mb: 0 }} />
      </Box>
      {children}
    </div>
  );
};

export default MenuListLayout;
