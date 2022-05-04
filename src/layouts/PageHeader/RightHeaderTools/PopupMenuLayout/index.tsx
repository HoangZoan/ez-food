import React, { useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PopupMenu from "../PopupMenu";

import classes from "./index.module.scss";

interface PopupMenuLayoutProps {
  type: "cart" | "notifications";
  children: any;
  itemsLength: number;
}

const PopupMenuLayout = ({
  type,
  itemsLength,
  children,
}: PopupMenuLayoutProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);

  function handleOpenMenu() {
    setAnchorEl(buttonRef.current);
    setShow(true);
  }

  function handleCloseMenu() {
    setShow(false);
    setAnchorEl(null);
  }

  return (
    <>
      <div onClick={handleOpenMenu} ref={buttonRef} className={classes.wrapper}>
        {type === "cart" ? (
          <LocalMallIcon fontSize="inherit" />
        ) : (
          <NotificationsIcon fontSize="inherit" />
        )}
      </div>

      <PopupMenu
        anchorEl={anchorEl}
        open={show}
        onClose={handleCloseMenu}
        itemsMaxLength={itemsLength}
      >
        {children}
      </PopupMenu>
    </>
  );
};

export default React.memo(PopupMenuLayout);
