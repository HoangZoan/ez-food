// PRODUCT TYPE
export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
}

// NOTIFICATION TYPE
export interface NotificationListType {
  id: string;
  image: string;
  title: string;
  description: string;
}

// PRODUCT DETAIL TYPE
export interface OptionVariantType {
  type: string;
  price: number;
  selected: boolean;
}

export interface OptionsType {
  name: string;
  variants: OptionVariantType[];
}

export interface SideDistType {
  name: string;
  price: number;
}

export interface ProductDetailType {
  id: string;
  title: string;
  price: number;
  options: OptionsType[];
  sideDish: SideDistType[];
}

// PRODUCT DETAIL STATE TYPE
export interface ProductDetailStateType {
  options: OptionsType[];
  availableSideDish: SideDistType[];
  selectedSideDish: SideDistType[];
  price: number;
  quantity: number;
  totalPrice: number;
}

// PRODUCT ORDER TYPE
export interface ProductOrderType extends ProductDetailStateType {
  orderId: string;
  title: string;
  price: number;
  date: string;
}
