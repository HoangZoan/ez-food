import React from "react";
import MenuItem from "components/UI/MenuItem";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatPriceText } from "shared/utils";
import { useCart } from "states/cart";
import { styled } from "shared/theme";

interface CartItemProps {
  id: string;
  title: string;
  total: number;
  quantity: number;
}

const ConfirmationBoard = styled(Stack)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

const CartItem = ({ id, title, total, quantity }: CartItemProps) => {
  const { removeOrder } = useCart();

  return (
    <MenuItem>
      <Box position="relative" width={1} height={1}>
        <Grid container spacing={3} sx={{ visibility: "hidden" }}>
          <Grid
            item
            sx={{
              aspectRatio: "1 / 1",
              maxWidth: "14rem",

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
            <CloseIcon
              onClick={() => removeOrder(id)}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  color: (theme) => theme.colors.common.grey,
                },
              }}
            />
          </Grid>
        </Grid>

        <ConfirmationBoard alignItems="center" justifyContent="center">
          <Typography variant="h6" sx={{ mb: 3 }}>
            Bạn muốn xóa sản phẩm này?
          </Typography>

          <Stack direction="row" spacing={4}>
            <Button variant="outlined">Hủy</Button>
            <Button variant="contained" color="error">
              Đồng ý
            </Button>
          </Stack>
        </ConfirmationBoard>
      </Box>
    </MenuItem>
  );
};

export default CartItem;
