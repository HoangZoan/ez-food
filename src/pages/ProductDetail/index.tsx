import React from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import ProductDetailCard from "components/ProductDetailCard";
import { SELECT_KEY } from "shared/config";
import { ProductDetailType } from "shared/types";
import { createId } from "shared/utils";
import { useCart } from "states/cart";
import PreviewProducts from "./PreviewProducts";
import ProductImage from "./ProductImage";

const dummyData: ProductDetailType = {
  id: "1",
  title: "Bánh mỳ cay",
  price: 20000,
  totalPrice: 20000,
  quantity: 1,
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
        { type: "Pate", price: 2000, selected: false },
        { type: "Trứng", price: 0, selected: true },
      ],
    },
  ],
  availableSideDish: [
    { name: "Rau củ", price: 0 },
    { name: "Chả quế", price: 3000 },
  ],
  selectedSideDish: [],
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
  const { addNewOrder } = useCart();

  const handleSubmit = (data: ProductDetailType) => {
    const orderId = createId(SELECT_KEY);
    const orderData = {
      ...data,
      orderId,
      title,
      date: new Date().toISOString(),
    };

    addNewOrder(orderData);
  };

  return (
    <Container sx={{ pt: 13 }}>
      <Stack alignItems="center">
        <Typography
          textAlign="center"
          color="primary"
          variant="h2"
          sx={{ maxWidth: "56rem" }}
        >
          {title}
        </Typography>
      </Stack>

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
