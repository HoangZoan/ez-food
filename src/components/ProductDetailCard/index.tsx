import { Grid, SxProps, Box, Stack, Typography } from "@mui/material";
import { ProductDetailType } from "shared/types";
import React from "react";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import ProductVariantOption from "components/ProductVariantOption";
import SideDishOption from "components/SideDishOption";
import SelectToAddButton from "components/SelectToAddButton";

interface ProductDetailCardProps {
  sx?: SxProps;
  item: ProductDetailType;
}

const ProductDetailCard = ({ sx, item }: ProductDetailCardProps) => {
  const { price, options, sideDish } = item;

  return (
    <Grid columnSpacing={6} container sx={{ ...sx }}>
      <Grid item xs={5}>
        <Box
          sx={{ backgroundColor: "green", width: 1, aspectRatio: "1 / 1" }}
        ></Box>
      </Grid>
      <Grid item xs={7}>
        <BorderBoxLayout sx={{ py: 4, px: 6 }}>
          <Stack spacing={4}>
            {options?.map(({ name: title, variants }) => (
              <ProductVariantOption
                key={title}
                title={title}
                variants={variants}
              />
            ))}

            <div>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Gọi thêm:
              </Typography>

              <SelectToAddButton items={sideDish} content="+ Lựa chọn" />
            </div>
          </Stack>
        </BorderBoxLayout>
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
