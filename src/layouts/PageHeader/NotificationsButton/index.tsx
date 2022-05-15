import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import NotificationItem from "../NotificationItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRecoilValue } from "recoil";
import { notificationsState } from "states/notifications";
import { Badge, List, Paper } from "@mui/material";

const IconButton = ({ invisible }: { invisible: boolean }) => {
  return (
    <Badge
      sx={{
        "& .MuiBadge-dot": {
          height: "12px",
          width: "12px",
          top: "4px",
          right: "4px",
          borderRadius: "50%",
        },
      }}
      badgeContent=" "
      invisible={invisible}
      color="primary"
      variant="dot"
    >
      <NotificationsIcon sx={{ fontSize: "24px" }} />
    </Badge>
  );
};

const NotificationsButton = () => {
  const notifications = useRecoilValue(notificationsState);

  return (
    <PopupMenuLayout
      icon={<IconButton invisible={notifications.length === 0} />}
    >
      <Paper sx={{ overflow: "auto" }}>
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
        </List>

        {notifications.length === 0 && <div>Chưa có thông báo mới</div>}
      </Paper>
    </PopupMenuLayout>
  );
};

export default React.memo(NotificationsButton);
