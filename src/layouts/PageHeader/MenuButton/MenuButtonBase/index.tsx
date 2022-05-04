import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import classes from "./index.module.scss";

interface MenuButtonBaseProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MenuButtonBase = ({ onClick }: MenuButtonBaseProps) => {
  return (
    <div
      onClick={(event) => onClick(event)}
      className={classes.wrapper + " rounded"}
    >
      <MenuIcon
        className={classes.icon}
        fontSize="large"
        sx={{ color: "white", marginRight: "1.2rem" }}
      />
      <div className={classes.text}>Thực đơn</div>
    </div>
  );
};

export default React.memo(MenuButtonBase);
