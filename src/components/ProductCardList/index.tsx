import React from "react";
import { MenuType } from "shared/types";
import { Grid } from "@mui/material";
import ProductCard from "components/UI/ProductCard";

interface ProductCardListProps {
  items: MenuType[];
}

const ProductCardList = ({ items }: ProductCardListProps) => {
  return (
    <Grid
      container
      rowSpacing={9}
      columnSpacing={6}
      sx={{ mb: 8, width: { sm: 0.7, md: 1 }, mx: "auto" }}
    >
      {items.map(({ id, title, description, price, imageUrl, itemType }) => (
        <Grid item xs={12} md={6} lg={4} key={id}>
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
