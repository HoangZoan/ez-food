import { Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { formatPriceText } from "shared/utils";
import { productDetailState } from "states/productDetail";

const ProductDetailTotalPrice = () => {
  const { totalPrice } = useRecoilValue(productDetailState);

  return (
    <Stack direction="row" spacing={4}>
      <Typography variant="h6">Tổng:</Typography>
      <Typography
        variant="h5"
        sx={{
          lineHeight: 1.2,
          fontWeight: 700,
          color: (theme) => theme.palette.primary.main,
        }}
      >
        {formatPriceText(totalPrice)}
      </Typography>
    </Stack>
  );
};

export default ProductDetailTotalPrice;
