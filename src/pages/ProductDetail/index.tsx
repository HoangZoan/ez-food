import { Button, Container, Grid, Typography } from "@mui/material";
import ProductDetailCard from "components/ProductDetailCard";
import React from "react";
import { useRecoilState } from "recoil";
import { ORDER_KEY } from "shared/config";
import { ProductDetailStateType, ProductDetailType } from "shared/types";
import { createId } from "shared/utils";
import { cartState } from "states/cart";
import PreviewProducts from "./PreviewProducts";
import ProductImage from "./ProductImage";

const dummyData: ProductDetailType = {
  id: "1",
  title: "Bánh mỳ cay",
  price: 20000,
  options: [
    {
      name: "Cỡ",
      variants: [
        { type: "Nửa chiếc", price: -10000, selected: false },
        { type: "Cỡ vừa", price: 0, selected: true },
        { type: "Cỡ lớn", price: 5000, selected: false },
      ],
    },
    {
      name: "Nhân bánh",
      variants: [
        { type: "Pate", price: 2000, selected: true },
        { type: "Trứng", price: 0, selected: false },
      ],
    },
  ],
  sideDish: [
    { name: "Rau củ", price: 0 },
    { name: "Chả quế", price: 3000 },
  ],
};

const SubmitButton = React.memo(() => {
  return (
    <Button type="submit" size="large" variant="contained">
      <Typography variant="h6">Đặt món</Typography>
    </Button>
  );
});

const ProductDetail = () => {
  const { title } = dummyData;
  const [ordersState, setOrdersState] = useRecoilState(cartState);

  const handleSubmit = (data: ProductDetailStateType) => {
    const orderId = createId(ORDER_KEY);
    const orderData = {
      ...data,
      orderId,
      title,
      date: new Date().toISOString(),
    };

    setOrdersState([orderData, ...ordersState]);
  };

  return (
    <Container sx={{ pt: 13 }}>
      <Typography textAlign="center" color="primary" variant="h3">
        {title}
      </Typography>

      <Grid columnSpacing={6} container sx={{ my: 7 }}>
        <Grid item xs={5}>
          <ProductImage />
        </Grid>
        <Grid item xs={7}>
          <ProductDetailCard
            item={dummyData}
            actionButton={<SubmitButton />}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>

      <PreviewProducts sx={{ my: 12 }} />
    </Container>
  );
};

export default ProductDetail;
