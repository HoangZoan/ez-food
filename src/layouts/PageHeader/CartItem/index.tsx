import { useState } from "react";
import MenuItem from "components/UI/MenuItem";
import { Box, ClickAwayListener, Grid, Stack, Typography } from "@mui/material";
import { formatPriceText } from "shared/utils";
import { useCart } from "states/cart";
import { styled } from "shared/theme";
import CloseButton from "components/UI/CloseButton";
import ConfirmationBox from "layouts/PageHeader/CartItem/ConfirmationBox";

interface CartItemProps {
  id: string;
  title: string;
  total: number;
  quantity: number;
}

const ConfirmationBoxLayout = styled(Stack)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

const CartItem = ({ id, title, total, quantity }: CartItemProps) => {
  const { removeOrder } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClickClose = () => {
    setIsRemoving(true);
  };

  const handleClickCancel = () => {
    setIsRemoving(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickCancel}>
      <MenuItem>
        <Box position="relative" width={1} height={1}>
          <Grid
            container
            spacing={3}
            sx={{ visibility: isRemoving ? "hidden" : "grid" }}
          >
            <Grid
              item
              xs={4}
              sx={{
                aspectRatio: "1 / 1",

                "& img": {
                  width: 1,
                  height: 1,
                  objectFit: "cover",
                },
              }}
            >
              <img
                src="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
                alt="Anh"
              />
            </Grid>

            <Grid xs item>
              <Typography
                mb={2}
                variant="h6"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </Typography>

              <Typography mb={1} variant="body1">
                Số lượng: {quantity}
              </Typography>
              <Typography variant="body1">
                Tổng: <strong>{formatPriceText(total)}</strong>
              </Typography>
            </Grid>

            <Grid item>
              <CloseButton onClick={handleClickClose} />
            </Grid>
          </Grid>

          <ConfirmationBoxLayout
            display={isRemoving ? "flex" : "none"}
            justifyContent="center"
          >
            <ConfirmationBox
              title="Bạn muốn xóa sản phẩm này?"
              onAction={() => removeOrder(id)}
              onCancel={handleClickCancel}
            />
          </ConfirmationBoxLayout>
        </Box>
      </MenuItem>
    </ClickAwayListener>
  );
};

export default CartItem;
