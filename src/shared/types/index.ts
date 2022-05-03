// NOTIFICATION TYPE
export interface NotificationListType {
  id: string;
  image: string;
  title: string;
  description: string;
}

// ORDER TYPE
export interface ProductInCartType {
  productId: string;
  title: string;
  quantity: number;
  total: number;
}
