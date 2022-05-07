import React from "react";
import { useRecoilValue } from "recoil";
import { notificationsState } from "states/notifications";
import NotificationsButton from "./NotificationsButton";
import CartButton from "./CartButton";

import classes from "./index.module.scss";

const RightHeaderTools = () => {
  const notifications = useRecoilValue(notificationsState);

  return (
    <div className={classes.wrapper}>
      <CartButton />
      <NotificationsButton notifications={notifications} />
    </div>
  );
};

export default React.memo(RightHeaderTools);
