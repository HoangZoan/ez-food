import React from "react";
import { MenuType } from "shared/types";
import { Grid } from "@mui/material";
import ProductCard from "components/UI/ProductCard";

interface ProductCardListProps {
  items: MenuType[];
}

const ProductCardList = ({ items }: ProductCardListProps) => {
  return (
    <Grid container columnSpacing={7} rowSpacing={6} sx={{ mb: 8 }}>
      {items.map(({ id, title, description, price, imageUrl, itemType }) => (
        <Grid item xs={4} key={id}>
          <ProductCard
            id={id!}
            menuType={itemType}
            title={title}
            description={description}
            price={price}
            imageSrc={imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCardList;
