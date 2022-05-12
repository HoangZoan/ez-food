import React from "react";
import { ProductType } from "shared/types";
import { Grid } from "@mui/material";
import ProductCard from "components/UI/ProductCard";

interface ProductCardListProps {
  items: ProductType[];
}

const ProductCardList = ({ items }: ProductCardListProps) => {
  return (
    <Grid container columnSpacing={7} rowSpacing={6} sx={{ mb: 8 }}>
      {items.map(({ id, title, description, price }) => (
        <Grid item xs={4} key={id}>
          <ProductCard title={title} description={description} price={price} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardList;
