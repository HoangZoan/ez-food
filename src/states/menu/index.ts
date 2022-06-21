import { atom } from "recoil";
import { TYPE_BEVERAGE } from "shared/config";

interface menuItemType {
  id: string;
  title: string;
  value: string;
}

const menuData = [
  { id: "menu-1", title: "Đồ uống", value: TYPE_BEVERAGE },
  { id: "menu-2", title: "Đồ uống", value: TYPE_BEVERAGE },
  { id: "menu-3", title: "Đồ uống", value: TYPE_BEVERAGE },
];

export const menuState = atom({
  key: "nav-menu",
  default: menuData as menuItemType[],
});

export const menuItemImageState = atom({
  key: "menuItemImage",
  default: null as any,
});
