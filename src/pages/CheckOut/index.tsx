import React from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import CheckOutOrdersList from "./CheckOutOrdersList";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "states/cart";
import CheckOutForm from "./CheckOutForm";

const CheckOut = () => {
  const cart = useRecoilValue(cartState);

  return (
    <Container sx={{ pt: { xs: 11, sm: 13 } }}>
      <Typography textAlign="center" variant="h2" sx={{ fontWeight: 700 }}>
        Giỏ hàng của bạn
      </Typography>

      {cart.length === 0 && (
        <Stack alignItems="center" spacing={5} sx={{ mt: 12, mb: 15 }}>
          <Typography variant="h5">Ban chua co don hang nao!</Typography>

          <Button component={Link} to="/" variant="contained">
            <Typography variant="h6">Xem thuc don</Typography>
          </Button>
        </Stack>
      )}

      {cart.length > 0 && (
        <Grid container sx={{ my: 7, mt: { xs: 5, md: 7 } }} columnSpacing={6}>
          <Grid item xs={12} md={6} lg={7}>
            <CheckOutOrdersList />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <CheckOutForm />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CheckOut;
