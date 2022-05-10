import { Button, Container, Typography } from "@mui/material";
import { ProductDetailStateType, ProductDetailType } from "shared/types";
import ProductDetailCard from "components/ProductDetailCard";

const dummyData: ProductDetailType = {
  id: "1",
  title: "Bánh mỳ cay",
  price: 20000,
  options: [
    {
      name: "Cỡ",
      variants: [
        { type: "Nửa chiếc", price: -10000, selected: false },
        { type: "Cỡ vừa", price: 0, selected: true },
        { type: "Cỡ lớn", price: 5000, selected: false },
      ],
    },
    {
      name: "Nhân bánh",
      variants: [
        { type: "Pate", price: 2000, selected: true },
        { type: "Trứng", price: 0, selected: false },
      ],
    },
  ],
  sideDish: [
    { name: "Rau củ", price: 0 },
    { name: "Chả quế", price: 3000 },
  ],
};

const SubmitButton = () => {
  return (
    <Button type="submit" size="large" variant="contained">
      <Typography variant="h6">Đặt món</Typography>
    </Button>
  );
};

const ProductDetail = () => {
  const { title } = dummyData;

  const handleSubmit = (data: ProductDetailStateType) => {
    console.log(data);
  };

  return (
    <Container sx={{ pt: 13 }}>
      <Typography textAlign="center" color="primary" variant="h3">
        {title}
      </Typography>

      <ProductDetailCard
        sx={{ my: 7 }}
        item={dummyData}
        actionButton={<SubmitButton />}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ProductDetail;
