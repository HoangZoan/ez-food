import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import CheckOutOrdersList from "./CheckOutOrdersList";

const CheckOut = () => {
  return (
    <Container sx={{ pt: 13 }}>
      <Typography textAlign="center" variant="h2" fontWeight={700}>
        Giỏ hàng của bạn
      </Typography>

      <Grid container columns={5} sx={{ my: 7 }}>
        <Grid item xs={3}>
          <CheckOutOrdersList />
        </Grid>
        <Grid item xs={2}>
          b
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckOut;
