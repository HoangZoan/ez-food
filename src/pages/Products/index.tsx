import React from "react";
import { ProductType } from "shared/types";
import MenuListLayout from "layouts/MenuListLayout";
import { Container, Stack } from "@mui/material";
import ProductCardList from "components/ProductCardList";
import PagePagination from "components/PagePagination";

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
  {
    id: "p-4",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-5",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
  {
    id: "p-6",
    title: "Bánh mỳ",
    description:
      "Mô tả: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    price: 20000,
  },
];

const Products = () => {
  return (
    <MenuListLayout onTop>
      <Container sx={{ py: 8 }}>
        <Stack alignItems="center">
          <ProductCardList items={dummyData} />

          <PagePagination count={3} />
        </Stack>
      </Container>
    </MenuListLayout>
  );
};

export default Products;
