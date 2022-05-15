import React from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import { cartTotalPriceState, headerCartState } from "states/cart";
import { useRecoilValue } from "recoil";
import CartItem from "../CartItem";
import {
  Badge,
  Button,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { formatPriceText } from "shared/utils";

const IconButton = ({ content }: { content: number }) => {
  return (
    <Badge
      badgeContent={
        <Typography color="white" fontWeight={700} variant="subtitle2">
          {content}
        </Typography>
      }
      color="primary"
      invisible={content === 0}
    >
      <LocalMallIcon sx={{ fontSize: "24px" }} />
    </Badge>
  );
};

const CartButton = () => {
  const cart = useRecoilValue(headerCartState);
  const cartTotalPrice = useRecoilValue(cartTotalPriceState);

  return (
    <PopupMenuLayout icon={<IconButton content={cart.length} />}>
      <Paper sx={{ backgroundColor: "white", minWidth: "48rem", py: 2 }}>
        {cart.length > 0 && (
          <>
            <List sx={{ py: 0, maxHeight: "40rem", overflow: "auto" }}>
              {cart.map(({ orderId, title, quantity, totalPrice }) => (
                <CartItem
                  key={orderId}
                  id={orderId}
                  title={title}
                  quantity={quantity}
                  total={totalPrice}
                />
              ))}
            </List>

            <Divider sx={{ backgroundColor: "primary.light" }} />

            <Stack alignItems="center">
              <Typography my={2} variant="h6">
                Tổng: {formatPriceText(cartTotalPrice)}
              </Typography>

              <Button variant="contained" sx={{ mb: 2 }}>
                <Typography variant="h6">Thanh toán</Typography>
              </Button>
            </Stack>
          </>
        )}

        {cart.length === 0 && (
          <Stack alignItems="center" sx={{ py: 3 }}>
            <Typography variant="h5">Bạn chưa đặt món nào!</Typography>
          </Stack>
        )}
      </Paper>
    </PopupMenuLayout>
  );
};

export default React.memo(CartButton);