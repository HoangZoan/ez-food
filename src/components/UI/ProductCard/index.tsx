import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Stack,
} from "@mui/material";
import { formatPriceText } from "shared/utils";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageSrc: string;
}

const ProductCard = ({
  title,
  description,
  price,
  imageSrc,
}: ProductCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        textAlign: "left",
      }}
    >
      <CardMedia component="img" src={imageSrc} />

      <Stack minHeight={300} justifyContent="space-between">
        <CardContent sx={{ px: 5 }}>
          <Typography mb={3} textAlign="center" variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </CardContent>
        <CardActions
          sx={{
            px: 5,
            pb: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Giá: {formatPriceText(price)}</Typography>
          <Button variant="contained">
            <Typography variant="body1">Đặt món</Typography>
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default ProductCard;
