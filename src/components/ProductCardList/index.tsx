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
      columnSpacing={{ xs: 0, md: 6 }}
      sx={{ mb: 8, mx: "auto", px: { sm: 6, md: 0 } }}
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
