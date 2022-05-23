import { AtomEffect } from "recoil";
import { PRODUCT_KEY } from "shared/config";
import { MenuType, OptionsType, SideDistType } from "shared/types";

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

// FORM DATA CONVERT FUNCTION
export const convertProductFormData = (data: { [key: string]: string }) => {
  const keys = Object.keys(data) as string[];

  // Handle option select
  const selectsArr = keys.filter((key) => key.match("select"));

  // Handle variants
  const variantsArr = keys.filter((key) => key.match("variant"));
  let optionVariantsArr = selectsArr.map(() => [] as string[]);
  variantsArr.forEach((string) => {
    const variantArr = string.split("-");
    const targetVariantIndex = Number(variantArr[1]);

    optionVariantsArr[targetVariantIndex].push(string);
  });

  // Generate output options
  const options: OptionsType[] = selectsArr.map((select, i) => ({
    name: data[select],
    variants: optionVariantsArr[i].map((type, j) => ({
      type: data[type],
      price: Number(data[`var-price-${i}-${j}`]) * 1000,
      selected: j === 0,
    })),
  }));

  // Handle side dish
  const sideDishArr = keys.filter((key) => key.match("sideDish"));

  // Generate output side dish
  const sideDish: SideDistType[] = sideDishArr.map((dish, i) => ({
    name: data[dish],
    price: Number(data[`side-price-${i}`]) * 1000,
  }));

  return { options, sideDish };
};

// CREATE NEW MENU FUNCTION
interface createNewMenuParams {
  title: string;
  price: string;
  menuType: string;
  options: OptionsType[];
  sideDish: SideDistType[];
}

type createNewMenuType = (params: createNewMenuParams) => void;

export const createNewMenu: createNewMenuType = ({
  title,
  price,
  menuType,
  options,
  sideDish,
}) => {
  return {
    id: createId(PRODUCT_KEY),
    title,
    price: Number(price),
    menuType,
    options,
    availableSideDish: sideDish,
    selectedSideDish: [],
    quantity: 1,
    totalPrice: Number(price),
    isPublished: true,
  } as MenuType;
};
