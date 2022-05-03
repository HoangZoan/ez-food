import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "components/Button";

import classes from "./index.module.scss";

const RightHeaderTools = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        <LocalMallIcon fontSize="medium" />
      </div>
      <div className={classes.icon}>
        <NotificationsIcon fontSize="medium" />
      </div>

      <Button variant="outlined" className={classes.button}>
        Đăng nhập
      </Button>
    </div>
  );
};

export default React.memo(RightHeaderTools);
