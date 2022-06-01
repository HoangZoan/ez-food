import { WhereFilterOp } from "firebase/firestore/lite";

// PRODUCT TYPE
export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
}

// NOTIFICATION TYPE
export interface NotificationListType {
  id?: string;
  imageUrl: string;
  title: string;
  description: string;
  isPublished: boolean;
  url: string;
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

interface ProductInfoType {
  id?: string;
  title: string;
  options: OptionsType[];
  price: number;
}

export interface ProductDetailType extends ProductInfoType {
  availableSideDish: SideDistType[];
  selectedSideDish: SideDistType[];
  quantity: number;
  totalPrice: number;
}

export interface ProductOrderType extends ProductDetailType {
  orderId: string;
  date: string;
  title: string;
}

export interface TableSortsType {
  title: string;
  value: string;
}

export interface MenuType extends ProductInfoType {
  isPublished: boolean;
  itemType: string;
  menuType: string;
  sideDish: SideDistType[];
  imageUrl: string;
}

// FIREBASE
export interface FirebaseQuery<T> {
  field: string;
  condition: WhereFilterOp;
  value: T;
}
