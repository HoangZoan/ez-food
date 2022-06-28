import React, { useState } from "react";
import PopupMenuLayout from "../PopupMenuLayout";
import { cartTotalPriceState, headerCartState } from "states/cart";
import { useRecoilValue } from "recoil";
import CartItem from "../CartItem";
import {
  Button,
  Container,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { formatPriceText } from "shared/utils";
import { Link } from "react-router-dom";
import BadgePrimary from "components/UI/BadgePrimary";
import { useMediaQueries } from "hooks/useMediaQueries";

const IconButton = ({ content }: { content: number }) => {
  return (
    <BadgePrimary count={content}>
      <LocalMallIcon sx={{ fontSize: "24px" }} />
    </BadgePrimary>
  );
};

const CartButton = () => {
  const cart = useRecoilValue(headerCartState);
  const cartTotalPrice = useRecoilValue(cartTotalPriceState);
  const [showPopup, setShowPopup] = useState(false);
  const { smDown } = useMediaQueries();

  const closePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <PopupMenuLayout
      icon={<IconButton content={cart.length} />}
      isClose={showPopup}
    >
      <Paper
        sx={[
          {
            backgroundColor: "white",
            minWidth: { sm: "48rem", md: "56rem" },
            py: 2,
            display: "flex",
            flexDirection: "column",
          },
          smDown && {
            height: "calc(100vh - 11rem)",
          },
        ]}
      >
        {cart.length > 0 && (
          <>
            <List
              sx={{
                py: 3,
                flex: 1,
                maxHeight: { sm: "40rem" },
                overflow: "auto",
              }}
            >
              {cart.map(
                ({ orderId, title, quantity, totalPrice, imageUrl }) => (
                  <CartItem
                    key={orderId}
                    id={orderId}
                    title={title}
                    imageUrl={imageUrl}
                    quantity={quantity}
                    total={totalPrice}
                  />
                )
              )}
            </List>

            <Divider sx={{ backgroundColor: "primary.light" }} />

            <Container>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                sx={{ py: 2 }}
              >
                <Typography my={2} variant="h6">
                  Tổng: {formatPriceText(cartTotalPrice)}
                </Typography>

                <Button
                  component={Link}
                  to="/check-out"
                  variant="contained"
                  onClick={closePopup}
                >
                  <Typography variant="h6">Thanh toán</Typography>
                </Button>
              </Stack>
            </Container>
          </>
        )}

        {cart.length === 0 && (
          <Stack alignItems="center" sx={{ py: 3 }}>
            <Typography variant="h6">Bạn chưa đặt món nào!</Typography>
          </Stack>
        )}
      </Paper>
    </PopupMenuLayout>
  );
};

export default React.memo(CartButton);
