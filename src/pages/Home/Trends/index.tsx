import { Container, Typography } from "@mui/material";
import ProductsCarousel from "pages/Home/Trends/ProductsCarousel";

const Trends = () => {
  return (
    <Container sx={{ my: "12rem" }}>
      <Typography
        textTransform="uppercase"
        variant="h2"
        mb={5}
        sx={{ color: "primary.main" }}
      >
        New + Hot Trend
      </Typography>

      <ProductsCarousel />
    </Container>
  );
};

export default Trends;
