export const formatPriceText = (price: number) => {
  const currency = Intl.NumberFormat("vi-VI");

  return currency.format(price) + "đ";
};
