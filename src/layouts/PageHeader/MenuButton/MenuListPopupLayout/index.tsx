import { Menu } from "@mui/material";

import classes from "./index.module.scss";

interface MenuListPopupLayoutProps {
  anchorEl: HTMLElement | null;
  show: boolean;
  onClose: () => void;
  children: any;
}

const MenuListPopupLayout = ({
  anchorEl,
  show,
  onClose,
  children,
}: MenuListPopupLayoutProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={show}
      onClose={onClose}
      disableScrollLock={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%",
          left: "0 !important",
        },
      }}
    >
      <div className={classes.wrapper}>
        <div className={`${classes.container} container`}>{children}</div>
      </div>
    </Menu>
  );
};

export default MenuListPopupLayout;
