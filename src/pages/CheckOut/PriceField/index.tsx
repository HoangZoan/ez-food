import { Stack, Typography } from "@mui/material";
import { formatPriceText } from "shared/utils";

interface PriceFieldProps {
  label: string;
  price: number;
}

const PriceField = ({ label, price }: PriceFieldProps) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography fontWeight={700}>{label}:</Typography>
      <Typography fontWeight={700}>{formatPriceText(price)}</Typography>
    </Stack>
  );
};

export default PriceField;
