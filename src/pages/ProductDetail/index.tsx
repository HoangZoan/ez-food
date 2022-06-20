import React from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import ProductDetailCard from "components/ProductDetailCard";
import { SELECT_KEY } from "shared/config";
import { ProductDetailType } from "shared/types";
import { createId } from "shared/utils";
import { useCart } from "states/cart";
import PreviewProducts from "./PreviewProducts";
import ProductImage from "./ProductImage";
import { useParams } from "react-router-dom";
import { useFetchMenuItem } from "api/menu/hooks";

const SubmitButton = React.memo(() => {
  return (
    <Button type="submit" size="large" variant="contained">
      <Typography variant="h6">Đặt món</Typography>
    </Button>
  );
});

const ProductDetail = () => {
  const { productId, type } = useParams<{
    productId: string;
    type: string;
  }>();
  const { addNewOrder } = useCart();
  const { fetchedItem } = useFetchMenuItem(type!, productId!);

  const handleSubmit = (data: ProductDetailType) => {
    const orderId = createId(SELECT_KEY);
    const orderData = {
      ...data,
      orderId,
      title: fetchedItem!.title,
      date: new Date().toISOString(),
    };

    addNewOrder(orderData);
  };

  if (!fetchedItem) return null;

  const menuItem = {
    id: fetchedItem.id,
    title: fetchedItem.title,
    description: fetchedItem.description,
    price: fetchedItem.price,
    quantity: 1,
    options: fetchedItem.options,
    totalPrice: fetchedItem.price,
    availableSideDish: fetchedItem.sideDish,
    selectedSideDish: [],
  } as ProductDetailType;

  return (
    <Container sx={{ pt: 13 }}>
      <Stack alignItems="center">
        <Typography
          textAlign="center"
          color="primary"
          variant="h2"
          sx={{ maxWidth: "56rem" }}
        >
          {fetchedItem.title}
        </Typography>
      </Stack>

      <Grid columnSpacing={6} container sx={{ my: 7 }}>
        <Grid item xs={5}>
          <ProductImage />
        </Grid>
        <Grid item xs={7}>
          <ProductDetailCard
            item={menuItem}
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
