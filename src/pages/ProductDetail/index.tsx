import { Container, Typography } from "@mui/material";
import { ProductDetailType } from "shared/types";
import ProductDetailCard from "components/ProductDetailCard";

const dummyData: ProductDetailType = {
  id: "1",
  title: "Bánh mỳ cay",
  price: 20000,
  options: [
    {
      name: "Cỡ",
      variants: [
        { type: "Nửa chiếc", price: -10000, defaultChoice: false },
        { type: "Cỡ vừa", price: 0, defaultChoice: true },
        { type: "Cỡ lớn", price: 5000, defaultChoice: false },
      ],
    },
    {
      name: "Nhân bánh",
      variants: [
        { type: "Pate", price: 2000, defaultChoice: true },
        { type: "Trứng", price: 0, defaultChoice: false },
      ],
    },
  ],
  sideDish: [
    { name: "Rau củ", price: 0 },
    { name: "Chả quế", price: 3000 },
  ],
};

const ProductDetail = () => {
  const { title } = dummyData;
  return (
    <Container sx={{ pt: 13 }}>
      <Typography textAlign="center" color="primary" variant="h3">
        {title}
      </Typography>

      <ProductDetailCard sx={{ my: 7 }} item={dummyData} />
    </Container>
  );
};

export default ProductDetail;
