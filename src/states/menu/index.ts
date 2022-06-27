import { atom } from "recoil";
import { TYPE_BEVERAGE, TYPE_FRIED, TYPE_STEAM } from "shared/config";

interface menuItemType {
  title: string;
  value: string;
}

const menuData = [
  { title: "Món chiên rán", value: TYPE_FRIED },
  { title: "Món hấp", value: TYPE_STEAM },
  { title: "Đồ uống", value: TYPE_BEVERAGE },
];

export const menuState = atom({
  key: "nav-menu",
  default: menuData as menuItemType[],
});

export const menuItemImageState = atom({
  key: "menuItemImage",
  default: null as any,
});
