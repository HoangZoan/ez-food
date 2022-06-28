import { useGetHomePageMenu } from "api/menu/hooks";
import { TYPE_FRIED } from "shared/config";
import MenuListPreview from "../MenuListPreview";

const FriedPreview = () => {
  const { fetchedMenu } = useGetHomePageMenu(TYPE_FRIED);

  if (!fetchedMenu) return null;

  return (
    <MenuListPreview
      menuTitle="Món chiên rán"
      menuType={TYPE_FRIED}
      items={fetchedMenu}
    />
  );
};

export default FriedPreview;
