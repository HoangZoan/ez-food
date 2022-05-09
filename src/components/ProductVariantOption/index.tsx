import { OptionVariantType } from "../../shared/types";
import { Typography, Stack, Button } from "@mui/material";

interface OptionProps {
  title: string;
  variants: OptionVariantType[];
}

const ProductVariantOption = ({ title, variants }: OptionProps) => {
  const handleClick = (price: number) => {
    console.log(`Add ${price} dong`);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}:
      </Typography>

      <Stack spacing={4} direction="row">
        {variants.map(({ type, price, selected }) => (
          <Button
            onClick={() => handleClick}
            key={type}
            variant={selected ? "contained" : "outlined"}
            sx={{
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
