import { atom, selector } from "recoil";
import {
  OptionsType,
  ProductDetailStateType,
  SideDistType,
} from "shared/types";

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

export const productTypePriceState = atom({
  key: "productTypePrice",
  default: [] as number[],
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
    const options = get(productOptionsState);
    const { availableSideDish, selectedSideDish } = get(productSideDishState);
    const typePrice = get(productTypePriceState).reduce(
      (increment, newValue) => increment + newValue,
      0
    );
    const price = get(productPriceState) + typePrice;
    const quantity = get(productQuantityState);
    const totalPrice = price * quantity * quantity;

    return {
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
export { useProductDetail } from "./hooks/useProductDetail";
export { useProductOptions } from "./hooks/useProductOptions";
