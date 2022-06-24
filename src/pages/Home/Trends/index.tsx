import { Container, Typography } from "@mui/material";
import ProductsCarousel from "pages/Home/Trends/ProductsCarousel";

const Trends = () => {
  return (
    <Container sx={{ my: { xs: "6.4rem", sm: "12rem" } }} id="trends">
      <Typography
        textTransform="uppercase"
        variant="h2"
        mb={5}
        sx={{ color: "primary.main", textAlign: { xs: "center", sm: "left" } }}
      >
        New + Hot Trend
      </Typography>

      <ProductsCarousel />
    </Container>
  );
};

export default Trends;
