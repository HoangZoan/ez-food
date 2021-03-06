import { OptionVariantType } from "../../../shared/types";
import { Typography, Stack, Button } from "@mui/material";
import { useProductOptions } from "states/productDetail";

interface OptionProps {
  title: string;
  variants: OptionVariantType[];
}

const ProductVariantOption = ({ title, variants }: OptionProps) => {
  const handleOptionChange = useProductOptions();

  const handleClick = (type: string, price: number) => {
    handleOptionChange(title, type, price);
  };

  return (
    <div>
      <Typography variant="h6">{title}:</Typography>

      <Stack columnGap={{ xs: 3, sm: 4 }} direction="row" flexWrap="wrap">
        {variants.map(({ type, price, selected }) => (
          <Button
            onClick={() => handleClick(type, price)}
            key={type}
            variant={selected ? "contained" : "outlined"}
            sx={{
              "&.MuiButton-root": {
                mt: 2,
              },
              "&.MuiButton-contained:hover": {
                cursor: "auto",
                backgroundColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            {type}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default ProductVariantOption;
