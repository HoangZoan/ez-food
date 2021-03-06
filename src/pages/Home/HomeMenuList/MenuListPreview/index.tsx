import { Button, Container } from "@mui/material";
import ProductCardList from "components/ProductCardList";
import MenuListLayout from "layouts/MenuListLayout";
import { Link } from "react-router-dom";
import { MenuType } from "shared/types";

interface Props {
  menuTitle: string;
  items: MenuType[];
  menuType: string;
}

const MenuListPreview = ({ menuTitle, items, menuType }: Props) => {
  return (
    <MenuListLayout title={menuTitle}>
      <Container sx={{ py: 9, textAlign: "center" }}>
        <ProductCardList items={items} />

        <Link to={`/products/${menuType}?page=1`}>
          <Button size="large" variant="outlined">
            Xem thực đơn
          </Button>
        </Link>
      </Container>
    </MenuListLayout>
  );
};

export default MenuListPreview;
