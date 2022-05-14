import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import { headerCartState } from "states/cart";
import { useRecoilValue } from "recoil";
import CartItem from "../CartItem";
import { Button, Divider, List, Paper, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const CartButton = () => {
  const cartState = useRecoilValue(headerCartState);

  return (
    <PopupMenuLayout icon={<LocalMallIcon sx={{ fontSize: "24px" }} />}>
      <Paper sx={{ backgroundColor: "white", width: "36rem" }}>
        <List>
          {cartState.map(({ orderId, title, quantity, totalPrice }) => (
            <CartItem
              key={orderId}
              id={orderId}
              title={title}
              quantity={quantity}
              total={totalPrice}
            />
          ))}
        </List>

        <div>
          <Divider sx={{ backgroundColor: "primary.light" }} />

          <Typography my={2} variant="h6">
            Tong: xx.xxxd
          </Typography>

          <Button variant="contained">
            <Typography variant="h6">Thanh toán</Typography>
          </Button>
        </div>
      </Paper>
    </PopupMenuLayout>
  );
};

export default React.memo(CartButton);
