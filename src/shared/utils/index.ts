import { AtomEffect } from "recoil";

// LOCALSTORAGE FUNCTIONS
export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

// UTILITY FUNCTIONS
export const createId = (key: string) => {
  const timeString = String(Date.now()).slice(-6);

  return key + "-" + timeString;
};

export const formatPriceText = (price: number) => {
  const currency = Intl.NumberFormat("vi-VI");

  return currency.format(price) + "đ";
};
