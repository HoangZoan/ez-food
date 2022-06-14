import { useFinishOrder, useRemoveOrder } from "api/order/hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CanceledOrderType,
  DateType,
  OrderStatusType,
  OrderType,
} from "shared/types";

export const useOrderTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderQuery = new URLSearchParams(location.search).get(
    "order"
  ) as OrderStatusType;
  const [orderDetail, setOrderDetail] = useState<OrderType>({} as OrderType);
  const [showOrderDetailDialog, setShowOrderDetail] = useState(false);
  const [showCanceledDetailDialog, setShowCanceledDetail] = useState(false);
  const [canceledOrder, setCanceledOrder] = useState<OrderType | null>(null);
  const {
    finishOrder,
    isFinishing: isFinishingOrder,
    isFinished: orderIsFinished,
    resetFinishOrder,
  } = useFinishOrder(orderQuery!);
  const { removingOrderId, removeOrder } = useRemoveOrder(orderQuery!);

  const handleSortChange = (value: string) => {
    navigate(`${location.pathname}?order=${value}`);
  };

  const showOrderDetail = (order: Omit<OrderType, "id">) => {
    setOrderDetail(order);
    setShowOrderDetail(true);
  };

  const closeOrderDetail = () => {
    setShowOrderDetail(false);

    if (orderQuery === "in-queue") {
      resetFinishOrder();
    }
  };

  const showCanceledDetail = (order: Omit<OrderType, "id">) => {
    setOrderDetail(order);
    setShowCanceledDetail(true);
  };

  const closeCanceledDetail = () => {
    setShowCanceledDetail(false);
  };

  const closeDeleteDialog = () => {
    setCanceledOrder(null);
  };

  const handleRemoveOrder = (id: string, data: CanceledOrderType) => {
    setCanceledOrder(null);
    removeOrder({ id, data });
  };

  const handleFinishOrder = () => {
    finishOrder({
      id: orderDetail.id!,
      data: { ...orderDetail, deliverAt: new Date() as DateType },
    });
  };

  const handleCancelOrder = (order: Omit<OrderType, "id">) => {
    setCanceledOrder(order);
  };

  return {
    orderQuery,
    orderDetail,
    showOrderDetailDialog,
    showCanceledDetailDialog,
    canceledOrder,
    isFinishingOrder,
    orderIsFinished,
    removingOrderId,
    handleSortChange,
    showOrderDetail,
    closeOrderDetail,
    showCanceledDetail,
    closeCanceledDetail,
    closeDeleteDialog,
    handleRemoveOrder,
    handleFinishOrder,
    handleCancelOrder,
  };
};
