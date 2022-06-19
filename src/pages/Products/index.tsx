import React from "react";
import MenuListLayout from "layouts/MenuListLayout";
import { Container, Stack } from "@mui/material";
import ProductCardList from "components/ProductCardList";
import PagePagination from "components/PagePagination";
import { useParams } from "react-router-dom";
import { TYPE_BEVERAGE } from "shared/config";
import { useFetchedMenu } from "api/menu/hooks";

const Products = () => {
  const { type } = useParams<{ type: string }>();
  const { fetchedMenu } = useFetchedMenu(type!);
  let title = "";
  const pagesCount =
    (fetchedMenu && fetchedMenu.length / 6 > 1 && fetchedMenu.length / 6) || 0;

  switch (type) {
    case TYPE_BEVERAGE:
      title = "Đồ uống";
      break;
  }

  return (
    <MenuListLayout title={title} onTop>
      <Container sx={{ py: 8 }}>
        <Stack alignItems="center">
          <ProductCardList items={fetchedMenu || []} />

          {fetchedMenu && <PagePagination count={pagesCount} />}
        </Stack>
      </Container>
    </MenuListLayout>
  );
};

export default Products;
