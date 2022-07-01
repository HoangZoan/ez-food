import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { productQuantityState } from "states/productDetail";

const ProductCounter = () => {
  const [productQuantity, setProductQuantity] =
    useRecoilState(productQuantityState);

  const handleAddProduct = () => {
    setProductQuantity((oldQuantity) => oldQuantity + 1);
  };

  const handleReduceProduct = () => {
    if (productQuantity === 1) return;

    setProductQuantity((oldQuantity) => oldQuantity - 1);
  };

  return (
    <Stack direction="row" spacing={4}>
      <Typography variant="h6">Số lượng:</Typography>

      <Stack direction="row" spacing={3}>
        <Button
          sx={{ px: 0, minWidth: "3.4rem" }}
          variant="outlined"
          onClick={handleReduceProduct}
        >
          -
        </Button>

        <Typography variant="h6" sx={{ mb: 2, lineHeight: 1.8 }}>
          {productQuantity}
        </Typography>

        <Button
          sx={{ px: 0, minWidth: "3.4rem" }}
          variant="outlined"
          onClick={handleAddProduct}
        >
          +
        </Button>
      </Stack>
    </Stack>
  );
};

export default React.memo(ProductCounter);
