import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import { headerCartState } from "states/cart";
import { useRecoilValue } from "recoil";
import CartItem from "../CartItem";
import { Box, Divider, List, Typography } from "@mui/material";
import Button from "components/UI/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const CartButton = () => {
  const cartState = useRecoilValue(headerCartState);

  return (
    <PopupMenuLayout icon={<LocalMallIcon sx={{ fontSize: "24px" }} />}>
      <Box>
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

          <Button>Thanh toán</Button>
        </div>
      </Box>
    </PopupMenuLayout>
  );
};

export default React.memo(CartButton);
