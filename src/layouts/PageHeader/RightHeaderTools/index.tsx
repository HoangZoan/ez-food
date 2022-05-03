import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { notificationsState } from "states/notifications";
import Button from "components/Button";
import ToolButton from "./ToolButton";
import NotificationItem from "./NotificationItem";

import classes from "./index.module.scss";

const RightHeaderTools = () => {
  const notifications = useRecoilValue(notificationsState);

  const notificationListJsxArry = useMemo(
    () =>
      notifications.map((item) => (
        <NotificationItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      )),
    [notifications]
  );

  return (
    <div className={classes.wrapper}>
      {/* <ToolButton type="cart" listItems={[]} /> */}
      <ToolButton type="notification" listItems={notificationListJsxArry} />

      <Button variant="outlined" className={classes.button}>
        Đăng nhập
      </Button>
    </div>
  );
};

export default React.memo(RightHeaderTools);
