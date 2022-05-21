import { Container, Grid, Typography } from "@mui/material";
import AdminNav from "./AdminNav";
import { Route, Routes } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import MenuTable from "./MenuTable";
import NotificationsTable from "./NotificationsTable";

const Admin = () => {
  return (
    <Container sx={{ mt: 13 }}>
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
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
