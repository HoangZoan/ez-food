import React, { FormEvent, useEffect } from "react";
import { Grid, SxProps, Box, Stack, Typography } from "@mui/material";
import { ProductDetailStateType, ProductDetailType } from "shared/types";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import SelectToAddButton from "components/ProductDetailCard/SelectToAddButton";
import ProductCounter from "components/ProductDetailCard/ProductCounter";
import ProductDetailTotalPrice from "components/ProductDetailCard/ProductDetailTotalPrice";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productDetailState } from "states/productDetail";
import ProductVariantOptionList from "components/ProductDetailCard/ProductVariantOptionList";

interface ProductDetailCardProps {
  sx?: SxProps;
  item: ProductDetailType;
  actionButton: React.ReactNode;
  onSubmit: (data: ProductDetailStateType) => void;
}

const ProductDetailCard = ({
  sx,
  item,
  actionButton,
  onSubmit,
}: ProductDetailCardProps) => {
  const setInitialState = useSetRecoilState(productDetailState);
  const productState = useRecoilValue(productDetailState);

  useEffect(() => {
    setInitialState((oldState) => ({
      ...oldState,
      options: item.options,
      availableSideDish: item.sideDish,
      totalPrice: item.price,
    }));
  }, [setInitialState, item]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(productState);
  };

  return (
    <Grid columnSpacing={6} container sx={{ ...sx }}>
      <Grid item xs={5}>
        <Box
          sx={{ backgroundColor: "green", width: 1, aspectRatio: "1 / 1" }}
        ></Box>
      </Grid>
      <Grid component="form" onSubmit={handleSubmit} item xs={7}>
        <BorderBoxLayout sx={{ py: 4, px: 6 }}>
          <Stack spacing={4}>
            <ProductVariantOptionList />

            <div>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Gọi thêm:
              </Typography>

              <SelectToAddButton content="+ Lựa chọn" />
            </div>

            <Stack direction="row" justifyContent="space-between">
              <ProductCounter />

              <ProductDetailTotalPrice />
            </Stack>
          </Stack>

          <Stack alignItems="center" sx={{ pt: 7 }}>
            {actionButton}
          </Stack>
        </BorderBoxLayout>
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
