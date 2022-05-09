import { atom } from "recoil";
import { ProductDetailStateType } from "shared/types";

export const productDetailState = atom({
  key: "productDetail",
  default: {
    options: [],
    availableSideDish: [],
    selectedSideDish: [],
    price: 0,
    quantity: 1,
    totalPrice: 0,
  } as ProductDetailStateType,
});
