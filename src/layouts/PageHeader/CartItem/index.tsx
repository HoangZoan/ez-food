import { useState } from "react";
import MenuItem from "components/UI/MenuItem";
import { Box, ClickAwayListener, Grid, Stack, Typography } from "@mui/material";
import { formatPriceText } from "shared/utils";
import { useCart } from "states/cart";
import { styled } from "shared/theme";
import CloseButton from "components/UI/CloseButton";
import ConfirmationBox from "layouts/PageHeader/CartItem/ConfirmationBox";
import { useMediaQueries } from "hooks/useMediaQueries";

interface CartItemProps {
  id: string;
  title: string;
  imageUrl: string;
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

const CartItem = ({ id, title, total, quantity, imageUrl }: CartItemProps) => {
  const { removeOrder } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const { mdUp, smUp } = useMediaQueries();

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
            columnGap={{ xs: 3, md: 5 }}
            sx={{ visibility: isRemoving ? "hidden" : "grid" }}
          >
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                aspectRatio: "1 / 1",

                "& img": {
                  width: 1,
                  height: 1,
                  objectFit: "cover",
                },
              }}
            >
              <img src={imageUrl} alt={title} />
            </Grid>

            <Grid xs item>
              <Typography
                mb={2}
                variant={smUp ? "h6" : "h5"}
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

            {mdUp && (
              <Grid item>
                <CloseButton onClick={handleClickClose} />
              </Grid>
            )}
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
