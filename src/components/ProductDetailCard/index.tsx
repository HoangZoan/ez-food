import React, { FormEvent, useEffect } from "react";
import { Stack, SxProps } from "@mui/material";
import { ProductDetailType } from "shared/types";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import ProductCounter from "components/ProductDetailCard/ProductCounter";
import ProductDetailTotalPrice from "components/ProductDetailCard/ProductDetailTotalPrice";
import { useRecoilValue } from "recoil";
import { productDetailState, useProductDetail } from "states/productDetail";
import ProductVariantOptionList from "components/ProductDetailCard/ProductVariantOptionList";
import SideDishOption from "./SideDishOption";

interface ProductDetailCardProps {
  item: ProductDetailType;
  actionButton: React.ReactNode;
  onSubmit: (data: ProductDetailType) => void;
  sx?: SxProps;
}

const ProductDetailCard = ({
  item,
  actionButton,
  onSubmit,
  sx,
}: ProductDetailCardProps) => {
  const productState = useRecoilValue(productDetailState);
  const setProductInitialState = useProductDetail();

  useEffect(() => {
    setProductInitialState(item);
  }, [setProductInitialState, item]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(productState);
  };

  return (
    <BorderBoxLayout
      component="form"
      onSubmit={handleSubmit}
      sx={{ py: 4, px: 6, ...sx }}
    >
      <Stack spacing={4}>
        <ProductVariantOptionList />

        <SideDishOption />

        <Stack direction="row" justifyContent="space-between">
          <ProductCounter />
          <ProductDetailTotalPrice />
        </Stack>
      </Stack>

      <Stack alignItems="center" sx={{ pt: 7 }}>
        {actionButton}
      </Stack>
    </BorderBoxLayout>
  );
};

export default ProductDetailCard;
