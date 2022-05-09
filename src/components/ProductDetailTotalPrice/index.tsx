import { Stack, Typography } from "@mui/material";
import { formatPriceText } from "shared/utils";

const ProductDetailTotalPrice = () => {
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
        {formatPriceText(15000)}
      </Typography>
    </Stack>
  );
};

export default ProductDetailTotalPrice;
