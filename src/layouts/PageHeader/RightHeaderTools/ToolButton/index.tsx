import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React, { useRef, useState } from "react";
import PopupMenu from "../PopupMenu";

import classes from "./index.module.scss";

interface ToolButtonProps {
  type: "cart" | "notification";
  listItems: React.ReactNode[] | [];
}

const ToolButton = ({ type, listItems }: ToolButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);
  let itemsMaxLength = listItems.length;

  const Icon = () => {
    switch (type) {
      case "cart":
        itemsMaxLength++;
        return <LocalMallIcon fontSize="medium" />;
      case "notification":
        return <NotificationsIcon fontSize="medium" />;
      default:
        return null;
    }
  };

  function handleOpenMenu() {
    setAnchorEl(buttonRef.current);
    setShow(true);
  }

  function handleCloseMenu() {
    setShow(false);
  }

  return (
    <>
      <div onClick={handleOpenMenu} ref={buttonRef} className={classes.wrapper}>
        <Icon />
      </div>

      <PopupMenu
        anchorEl={anchorEl}
        open={show}
        onClose={handleCloseMenu}
        itemsMaxLength={itemsMaxLength}
      >
        {listItems.length > 0 && listItems}
        {listItems.length === 0 && (
          <div className={classes["no-notification"]}>
            Chưa có thông báo mới
          </div>
        )}
      </PopupMenu>
    </>
  );
};

export default React.memo(ToolButton);
