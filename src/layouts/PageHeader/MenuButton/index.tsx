import React, { useState } from "react";
import MenuListPopupLayout from "./MenuListPopupLayout";
import MenuContent from "./MenuContent";
import IconButton from "layouts/PageHeader/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import { MenuButtonContext } from "./context/MenuButtonContext";

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
    <MenuButtonContext.Provider value={{ onClosePopup: handleOnClose }}>
      <IconButton onClick={handleOnOpen} variant="contained" sx={{ px: 3 }}>
        <MenuIcon fontSize="large" sx={{ marginRight: "1.2rem" }} />
        <Typography variant="h6">Thực đơn</Typography>
      </IconButton>

      <MenuListPopupLayout
        show={show}
        anchorEl={anchorEl}
        onClose={handleOnClose}
      >
        <MenuContent />
      </MenuListPopupLayout>
    </MenuButtonContext.Provider>
  );
};

export default React.memo(MenuButton);
