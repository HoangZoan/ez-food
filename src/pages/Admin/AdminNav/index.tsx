import { List, ListItem, Typography } from "@mui/material";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navDatas = [
  { title: "Quản lý đơn hàng", path: "/admin/orders" },
  { title: "Quản lý thực đơn", path: "/admin/menu" },
  { title: "Quản lý thông báo", path: "/admin/notifications" },
];

const AdminNav = () => {
  const { pathname } = useLocation();

  return (
    <BorderBoxLayout sx={{ overflow: "hidden" }}>
      <List sx={{ py: 0 }}>
        {navDatas.map(({ title, path }) => (
          <ListItem
            key={path}
            sx={{
              justifyContent: "center",
              backgroundColor: (theme) =>
                path === pathname ? theme.colors.background.primary : "white",
            }}
          >
            <Typography
              component={Link}
              to={path}
              variant="body1"
              fontWeight={path === pathname ? 700 : 400}
              color={path === pathname ? "primary" : "inherit"}
            >
              {title}
            </Typography>
          </ListItem>
        ))}
      </List>
    </BorderBoxLayout>
  );
};

export default AdminNav;
