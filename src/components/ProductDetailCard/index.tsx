import { FormEvent } from "react";
import { Grid, SxProps, Box, Stack, Typography, Button } from "@mui/material";
import { ProductDetailType } from "shared/types";
import { useProductDetail } from "hooks/useProductDetail";
import BorderBoxLayout from "layouts/BorderBoxLayout";
import ProductVariantOption from "components/ProductVariantOption";
import SideDishOption from "components/SideDishOption";
import SelectToAddButton from "components/SelectToAddButton";
import ProductCounter from "components/ProductCounter";
import ProductDetailTotalPrice from "components/ProductDetailTotalPrice";

interface ProductDetailCardProps {
  sx?: SxProps;
  item: ProductDetailType;
}

const ProductDetailCard = ({ sx, item }: ProductDetailCardProps) => {
  const { price, options, sideDish } = item;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit}
      columnSpacing={6}
      container
      sx={{ ...sx }}
    >
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

            <Stack direction="row" justifyContent="space-between">
              <ProductCounter />

              <ProductDetailTotalPrice />
            </Stack>

            <Stack alignItems="center">
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 5 }}
              >
                <Typography variant="h6">Thanh toán</Typography>
              </Button>
            </Stack>
          </Stack>
        </BorderBoxLayout>
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
