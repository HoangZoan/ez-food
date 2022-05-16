import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { formatPriceText } from "shared/utils";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
}

const ProductCard = ({ title, description, price }: ProductCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: 1,
          aspectRatio: "5 / 4",
        }}
      ></Box>
      <div>
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
      </div>
    </Card>
  );
};

export default ProductCard;
