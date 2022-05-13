import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import { headerCartState } from "states/cart";
import { useRecoilValue } from "recoil";
import CartItem from "../CartItem";
import { Divider, Typography } from "@mui/material";
import classes from "./index.module.scss";
import Button from "components/UI/Button";

const CartButton = () => {
  const cartState = useRecoilValue(headerCartState);

  return (
    <PopupMenuLayout type="cart" itemsLength={cartState.length}>
      {cartState.map(({ orderId, title, quantity, totalPrice }) => (
        <CartItem
          key={orderId}
          id={orderId}
          title={title}
          quantity={quantity}
          total={totalPrice}
        />
      ))}

      <div className={classes.bottom}>
        <Divider sx={{ backgroundColor: "primary.light" }} />

        <Typography my={2} variant="h6">
          Tong: xx.xxxd
        </Typography>

        <Button>Thanh toán</Button>
      </div>
    </PopupMenuLayout>
  );
};

export default React.memo(CartButton);
