import React from "react";
import MenuListLayout from "layouts/MenuListLayout";
import { Container, Stack } from "@mui/material";
import ProductCardList from "components/ProductCardList";
import { useLocation, useParams } from "react-router-dom";
import { TYPE_BEVERAGE } from "shared/config";
import { useFetchedMenu } from "api/menu/hooks";
import { getPaginationData } from "shared/utils";
import LinkPagination from "components/LinkPagination";

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const { type } = useParams<{ type: string }>();
  const { fetchedMenu } = useFetchedMenu(type!);
  const { pageCount, pageItems: menuItems } = getPaginationData({
    page: page,
    perPage: 6,
    items: fetchedMenu,
  });

  let title = "";
  switch (type) {
    case TYPE_BEVERAGE:
      title = "Đồ uống";
      break;
  }

  return (
    <MenuListLayout title={title} onTop>
      <Container sx={{ py: 8 }}>
        <Stack alignItems="center">
          <ProductCardList items={menuItems} />

          {fetchedMenu && (
            <LinkPagination
              count={pageCount}
              locationPath={location.pathname}
            />
          )}
        </Stack>
      </Container>
    </MenuListLayout>
  );
};

export default Products;
