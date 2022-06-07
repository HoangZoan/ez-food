import { List, ListItem, Typography } from "@mui/material";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import { Link, useLocation } from "react-router-dom";

const navDatas = [
  {
    title: "Quản lý đơn hàng",
    path: "/admin/orders",
    defaultQuery: "?order=in-queue",
  },
  { title: "Quản lý thực đơn", path: "/admin/menu", defaultQuery: "" },
  {
    title: "Quản lý thông báo",
    path: "/admin/notifications",
    defaultQuery: "",
  },
];

const AdminNav = () => {
  const { pathname } = useLocation();

  return (
    <BorderBoxLayout sx={{ overflow: "hidden" }}>
      <List sx={{ py: 0 }}>
        {navDatas.map(({ title, path, defaultQuery }) => (
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
              to={path + defaultQuery}
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
