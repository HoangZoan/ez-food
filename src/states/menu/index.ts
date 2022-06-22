import { atom } from "recoil";
import { TYPE_BEVERAGE } from "shared/config";

interface menuItemType {
  title: string;
  value: string;
}

const menuData = [
  { title: "Đồ uống", value: TYPE_BEVERAGE },
  // { title: "Đồ uống", value: "abc" },
  // { title: "Đồ uống", value: "bcd" },
];

export const menuState = atom({
  key: "nav-menu",
  default: menuData as menuItemType[],
});

export const menuItemImageState = atom({
  key: "menuItemImage",
  default: null as any,
});
