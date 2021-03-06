import { WhereFilterOp } from "firebase/firestore/lite";

// DATA TYPE
export interface DateType extends Date {
  seconds: number;
}

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

export interface SideDishType {
  name: string;
  price: number;
}

interface ProductInfoType {
  id?: string;
  title: string;
  options: OptionsType[];
  price: number;
  description: string;
  imageUrl: string;
}

export interface ProductDetailType extends ProductInfoType {
  availableSideDish: SideDishType[];
  selectedSideDish: SideDishType[];
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
  sideDish: SideDishType[];
}

// ORDER TYPE
export interface OrderType {
  id?: string;
  orderAt: DateType;
  deliverAt: DateType | null;
  fullName: string;
  phoneNumber: string;
  address: string;
  orders: ProductOrderType[];
  totalPrice: number;
  status: OrderStatusType;
  cancelMessage: string;
}

export interface CanceledOrderType extends OrderType {
  cancelMessage: string;
}

// ADMIN
export type OrderStatusType = "in-queue" | "delivered" | "canceled";

// FIREBASE
export interface FirebaseQuery<T> {
  field: string;
  condition: WhereFilterOp;
  value: T;
}
