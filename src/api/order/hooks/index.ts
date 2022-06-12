import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CanceledOrderType, OrderStatusType, OrderType } from "shared/types";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { orderApi } from "..";
import { usePubNub } from "pubnub-react";
import { NEW_ORDER_NOTIFICATIONS } from "shared/config";

interface UseCreateOrder {
  handleSuccess: () => void;
}

export const useFetchOrders = (orderStatus: OrderStatusType) => {
  const { showToast } = useSnackbar();

  const {
    data: fetchedOrders,
    isLoading,
    isRefetching,
    isFetched,
    isError: fetchError,
    refetch: refetchOrders,
  } = useQuery(
    ["orders", orderStatus],
    () => orderApi.fetchOrders(orderStatus),
    {
      onSuccess: () => {
        if (!isFetched) return;

        showToast({
          title: "Đã cập nhật đơn hàng mới",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return {
    fetchedOrders,
    isLoading,
    refetchOrders,
    isRefetching,
    fetchError,
  };
};

export const useCreateOrder = ({ handleSuccess }: UseCreateOrder) => {
  const pubnub = usePubNub();
  const { showToast } = useSnackbar();
  const { isLoading: isCreating, mutate: createOrder } = useMutation(
    orderApi.createNewOrder,
    {
      onMutate: async () => {
        try {
          await pubnub.publish({
            channel: NEW_ORDER_NOTIFICATIONS,
            message: "new-order",
          });
        } catch (error) {
          throw error;
        }
      },
      onSuccess: handleSuccess,
      onError: () => {
        showToast({
          title: "Đặt hàng không thành công. Vui lòng thử lại.",
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return { isCreating, createOrder };
};

export const useFinishOrder = (orderStatus: OrderStatusType) => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const {
    mutate: finishOrder,
    isLoading: isFinishing,
    isSuccess: isFinished,
    reset: resetFinishOrder,
  } = useMutation(
    ({ id, data }: { id: string; data: Partial<OrderType> }) =>
      orderApi.updateOrder({ id, data: { ...data, status: "delivered" } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders", orderStatus]);
        showToast({
          title: "Đơn hàng đã hoàn thành",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
      onError: () => {
        showToast({
          title: "Đơn hàng chưa hoàn thành",
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return {
    isFinishing,
    finishOrder,
    isFinished,
    resetFinishOrder,
  };
};

export const useRemoveOrder = (orderStatus: OrderStatusType) => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const [removingOrderId, setDeletingId] = useState("");
  const { mutate: removeOrder } = useMutation(
    ({ id, data }: { id: string; data: CanceledOrderType }) =>
      orderApi.updateOrder({ id, data: { ...data, status: "canceled" } }),
    {
      onMutate: ({ id }) => {
        setDeletingId(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["orders", orderStatus]);
        showToast({
          title: "Hủy đơn hàng thành công!",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
      onError: () => {
        showToast({
          title: "Hủy đơn hàng không thành công",
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
      onSettled: () => {
        setDeletingId("");
      },
    }
  );

  return {
    removingOrderId,
    removeOrder,
  };
};
