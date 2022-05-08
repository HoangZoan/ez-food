import React from "react";
import { ProductType } from "shared/types";
import MenuListLayout from "layouts/MenuListLayout";
import { Container, Button as MuiButton } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCardList from "components/ProductCardList";

const dummyData: ProductType[] = [
  {
    id: "p-1",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-2",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-3",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
];

const HomeMenuList = () => {
  return (
    <MenuListLayout>
      <Container sx={{ py: 9, textAlign: "center" }}>
        <ProductCardList items={dummyData} />

        <Link to="/products">
          <MuiButton variant="outlined">Xem thực đơn</MuiButton>
        </Link>
      </Container>
    </MenuListLayout>
  );
};

export default HomeMenuList;
