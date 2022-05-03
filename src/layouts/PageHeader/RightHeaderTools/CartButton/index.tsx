import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import { cartState as state } from "states/cart";
import { useRecoilValue } from "recoil";
import CartItem from "../CartItem";
import { Divider, Typography } from "@mui/material";
import Button from "components/Button";

import classes from "./index.module.scss";

const CartButton = () => {
  const cartState = useRecoilValue(state);

  return (
    <PopupMenuLayout type="cart" itemsLength={cartState.length}>
      {cartState.map(({ productId, title, quantity, total }) => (
        <CartItem
          key={productId}
          productId={productId}
          title={title}
          quantity={quantity}
          total={total}
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
