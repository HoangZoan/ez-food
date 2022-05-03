import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import NotificationItem from "../NotificationItem";
import { NotificationListType } from "shared/types";

import classes from "./index.module.scss";

const NotificationsButton = ({
  notifications,
}: {
  notifications: NotificationListType[];
}) => {
  return (
    <PopupMenuLayout type="notifications" itemsLength={notifications.length}>
      {notifications.length > 0 &&
        notifications.map((item) => (
          <NotificationItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      {notifications.length === 0 && (
        <div className={classes["no-notification"]}>Chưa có thông báo mới</div>
      )}
    </PopupMenuLayout>
  );
};

export default React.memo(NotificationsButton);
