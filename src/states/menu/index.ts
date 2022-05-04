import { atom } from "recoil";

interface menuItemType {
  id: string;
  title: string;
}

const menuData = [
  { id: "menu-1", title: "Món bánh mỳ" },
  { id: "menu-2", title: "Món chiên rán" },
  { id: "menu-3", title: "Đồ uống" },
];

export const menuState = atom({
  key: "nav-menu",
  default: menuData as menuItemType[],
});
