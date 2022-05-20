import { atom, selector } from "recoil";
import { SELECT_KEY } from "shared/config";
import { ProductOrderType } from "shared/types";
import { localStorageEffect } from "shared/utils";

export const cartState = atom({
  key: "cart",
  default: [] as ProductOrderType[],
  effects: [localStorageEffect(SELECT_KEY)],
});

export const headerCartState = selector({
  key: "headerCart",
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.map(({ orderId, title, quantity, totalPrice }) => ({
      orderId,
      title,
      quantity,
      totalPrice,
    }));
  },
});

export const cartTotalPriceState = selector({
  key: "cartTotalPriceState",
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((increment, current) => {
      return increment + current.totalPrice;
    }, 0);
  },
});

export { useCart } from "./hooks/useCart";
