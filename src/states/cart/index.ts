import { atom, selector } from "recoil";
import { ORDER_KEY } from "shared/config";
import { ProductOrderType } from "shared/types";
import { localStorageEffect } from "shared/utils";

export const cartState = atom({
  key: "cart",
  default: [] as ProductOrderType[],
  effects: [localStorageEffect(ORDER_KEY)],
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
