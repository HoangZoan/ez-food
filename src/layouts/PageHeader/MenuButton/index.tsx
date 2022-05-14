import React, { useState } from "react";
import MenuListPopupLayout from "./MenuListPopupLayout";
import MenuContent from "./MenuContent";
import IconButton from "layouts/PageHeader/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const show = Boolean(anchorEl);

  const handleOnOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOnOpen} variant="contained" sx={{ px: 3 }}>
        <MenuIcon fontSize="large" sx={{ marginRight: "1.2rem" }} />
        <Typography variant="h5">Thực đơn</Typography>
      </IconButton>

      <MenuListPopupLayout
        show={show}
        anchorEl={anchorEl}
        onClose={handleOnClose}
      >
        <MenuContent />
      </MenuListPopupLayout>
    </>
  );
};

export default React.memo(MenuButton);
