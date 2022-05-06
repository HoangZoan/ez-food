import React from "react";
import { Menu, makeStyles } from "@mui/material";

interface PopupMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode[];
  itemsMaxLength: number;
}

const PopupMenu = ({
  anchorEl,
  open,
  onClose,
  children,
  itemsMaxLength,
}: PopupMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          overflow: "visible",
        },
        "& .MuiList-root": {
          marginTop: "1.8rem",
          maxHeight: "54rem",
          paddingTop: "1.6rem",
          paddingBottom: "0",
          marginBottom: "0.8rem",
          overflowY: itemsMaxLength > 3 ? "scroll" : "visible",
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default PopupMenu;
