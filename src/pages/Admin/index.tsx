import { Container, Grid, Typography } from "@mui/material";
import AdminNav from "./AdminNav";
import { Route, Routes } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import MenuTable from "./MenuTable";
import NotificationsTable from "./NotificationsTable";
import NotFoundAdmin from "./NotFoundAdmin";

const Admin = () => {
  return (
    <Container sx={{ mt: 13, minHeight: "48rem" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
        Trang quản lý
      </Typography>

      <Grid container sx={{ my: 7 }} columnSpacing={7}>
        <Grid item xs={3}>
          <AdminNav />
        </Grid>
        <Grid item xs={9}>
          <Routes>
            <Route path="orders" element={<OrdersTable />} />
            <Route path="menu" element={<MenuTable />} />
            <Route path="notifications" element={<NotificationsTable />} />
            <Route path="*" element={<NotFoundAdmin />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
