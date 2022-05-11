import { atom, selector } from "recoil";
import {
  OptionsType,
  ProductDetailStateType,
  SideDistType,
} from "shared/types";

export const productInfoState = atom({
  key: "productInfo",
  default: {
    id: "",
    title: "",
  },
});

export const productOptionsState = atom({
  key: "productOptions",
  default: [] as OptionsType[],
});

export const productSideDishState = atom({
  key: "productSideDish",
  default: {
    availableSideDish: [] as SideDistType[],
    selectedSideDish: [] as SideDistType[],
  },
});

export const productPriceState = atom({
  key: "productPrice",
  default: 0,
});

export const productQuantityState = atom({
  key: "productQuantity",
  default: 1,
});

export const productDetailState = selector({
  key: "productDetail",
  get: ({ get }) => {
    const { id, title } = get(productInfoState);
    const options = get(productOptionsState);
    const { availableSideDish, selectedSideDish } = get(productSideDishState);
    const price = get(productPriceState);
    const quantity = get(productQuantityState);
    const totalPrice = price * quantity * quantity;

    return {
      id,
      title,
      options,
      availableSideDish,
      selectedSideDish,
      price,
      quantity,
      totalPrice,
    } as ProductDetailStateType;
  },
});

export { useProductSideDish } from "./hooks/useProductSideDish";
