import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import NotificationItem from "../NotificationItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, List, Paper, Stack, Typography } from "@mui/material";
import { useFetchedNotifications } from "api/notifications/hooks";

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
  const { fetchedNotifications } = useFetchedNotifications();

  return (
    <PopupMenuLayout
      icon={<IconButton invisible={fetchedNotifications?.length === 0} />}
    >
      <Paper elevation={0} sx={{ overflow: "auto" }}>
        <List
          sx={{
            maxHeight: { xs: "calc(100vh - 9.6rem)", sm: "48rem" },
            mb: { xs: 4, sm: 0 },
            overflow: "auto",
          }}
        >
          {fetchedNotifications?.map((item) => (
            <NotificationItem
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              url={item.url}
            />
          ))}
        </List>

        {fetchedNotifications?.length === 0 && (
          <Stack alignItems="center" sx={{ pb: 3, minWidth: "32rem" }}>
            <Typography variant="h6">Chưa có thông báo mới</Typography>
          </Stack>
        )}
      </Paper>
    </PopupMenuLayout>
  );
};

export default React.memo(NotificationsButton);
