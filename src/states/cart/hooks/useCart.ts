import { useRecoilState } from "recoil";
import { ProductOrderType } from "shared/types";
import { cartState } from "..";

export const useCart = () => {
  const [ordersState, setOrdersState] = useRecoilState(cartState);

  const addNewOrder = (newOrder: ProductOrderType) => {
    setOrdersState([newOrder, ...ordersState]);
  };

  const removeOrder = (id: string) => {
    const orderIndex = ordersState.findIndex(({ orderId }) => orderId === id);
    const newOrders = [
      ...ordersState.slice(0, orderIndex),
      ...ordersState.slice(orderIndex + 1),
    ];

    setOrdersState(newOrders);
  };

  return {
    addNewOrder,
    removeOrder,
  };
};
