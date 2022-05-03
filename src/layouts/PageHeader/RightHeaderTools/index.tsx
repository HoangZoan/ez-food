import React from "react";
import { useRecoilValue } from "recoil";
import { notificationsState } from "states/notifications";
import Button from "components/Button";
import NotificationsButton from "./NotificationsButton";
import CartButton from "./CartButton";

import classes from "./index.module.scss";

const RightHeaderTools = () => {
  const notifications = useRecoilValue(notificationsState);

  return (
    <div className={classes.wrapper}>
      <NotificationsButton notifications={notifications} />
      <CartButton />

      <Button variant="outlined" className={classes.button}>
        Đăng nhập
      </Button>
    </div>
  );
};

export default React.memo(RightHeaderTools);
