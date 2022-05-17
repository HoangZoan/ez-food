import { Stack, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { formatPriceText } from "shared/utils";
import { productTotalPriceState } from "states/productDetail";

const ProductDetailTotalPrice = () => {
  const totalPrice = useRecoilValue(productTotalPriceState);

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      <Typography variant="h6">Tổng:</Typography>
      <Typography
        variant="h6"
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

export default React.memo(ProductDetailTotalPrice);
