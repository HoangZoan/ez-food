import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import NotificationItem from "../NotificationItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRecoilValue } from "recoil";
import { notificationsState } from "states/notifications";
import { Box, List } from "@mui/material";

const NotificationsButton = () => {
  const notifications = useRecoilValue(notificationsState);

  return (
    <PopupMenuLayout icon={<NotificationsIcon sx={{ fontSize: "24px" }} />}>
      <List sx={{ maxHeight: "48rem" }}>
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
        {notifications.length === 0 && <div>Chưa có thông báo mới</div>}
      </List>
    </PopupMenuLayout>
  );
};

export default React.memo(NotificationsButton);
