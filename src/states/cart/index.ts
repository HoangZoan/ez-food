import { atom } from "recoil";
import { ProductInCartType } from "shared/types";

const dummyData = [
  {
    id: "p-1",
    image: "",
    title: "Banh My Banh My Banh My Banh My Banh My",
    price: 20000,
    quantity: 2,
    total: 40000,
  },
  {
    id: "p-2",
    image: "",
    title: "Banh My",
    price: 20000,
    quantity: 2,
    total: 40000,
  },
  {
    id: "p-3",
    image: "",
    title: "Banh My",
    price: 20000,
    quantity: 2,
    total: 40000,
  },
  {
    id: "p-4",
    image: "",
    title: "Banh My",
    price: 20000,
    quantity: 2,
    total: 40000,
  },
];

export const cartState = atom({
  key: "cart",
  default: dummyData as ProductInCartType[],
});
