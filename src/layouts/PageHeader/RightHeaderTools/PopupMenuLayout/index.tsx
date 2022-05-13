import React, { useState } from "react";
import { Button, Popover, SxProps } from "@mui/material";
import { styled } from "shared/theme";

interface PopupMenuLayoutProps {
  children: any;
  icon: React.ReactNode;
}

interface ButtonSx {
  [key: string]: SxProps;
}

const IconButton = styled(Button)(
  ({ theme }): ButtonSx => ({
    "&.MuiButton-root": {
      backgroundColor: "transparent",
      padding: "0.8rem 0",
      minWidth: "45px",
    },
    "&.MuiButton-contained:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: theme.palette.primary.main,
    },
  })
);

const PopupMenuLayout = ({ children, icon }: PopupMenuLayoutProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  function handleOpenMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton onClick={handleOpenMenu} variant="contained">
        {icon}
      </IconButton>

      <Popover
        elevation={2}
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default React.memo(PopupMenuLayout);
