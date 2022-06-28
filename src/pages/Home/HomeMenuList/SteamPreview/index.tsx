import { useGetHomePageMenu } from "api/menu/hooks";
import { TYPE_STEAM } from "shared/config";
import MenuListPreview from "../MenuListPreview";

const SteamPreview = () => {
  const { fetchedMenu } = useGetHomePageMenu(TYPE_STEAM);

  if (!fetchedMenu) return null;

  return (
    <MenuListPreview
      menuTitle="Món hấp"
      menuType={TYPE_STEAM}
      items={fetchedMenu}
    />
  );
};

export default SteamPreview;
