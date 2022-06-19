import { useGetHomePageMenu } from "api/menu/hooks";
import { TYPE_BEVERAGE } from "shared/config";
import MenuListPreview from "../MenuListPreview";

const BaveragePreiew = () => {
  const { fetchedMenu } = useGetHomePageMenu(TYPE_BEVERAGE);

  if (!fetchedMenu) return null;

  return (
    <MenuListPreview
      menuTitle="Đồ uống"
      menuType={TYPE_BEVERAGE}
      items={fetchedMenu}
    />
  );
};

export default BaveragePreiew;
