import React from "react";
import Grid from "@mui/material/Grid";
import ProductPreviewCard from "components/ProductPreviewCard";

const MenuPreview = () => {
  return (
    <Grid container columnGap={8}>
      <Grid item xs>
        <ProductPreviewCard />
      </Grid>
      <Grid item xs>
        <ProductPreviewCard />
      </Grid>
      <Grid item xs>
        <ProductPreviewCard />
      </Grid>
    </Grid>
  );
};

export default MenuPreview;
