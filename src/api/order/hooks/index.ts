import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { OrderStatusType } from "shared/types";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { orderApi } from "..";

interface UseCreateOrder {
  handleSuccess: () => void;
}

export const useFetchOrders = (orderStatus: OrderStatusType) => {
  const { data: fetchedOrders, isLoading } = useQuery(
    ["orders", orderStatus],
    () => orderApi.fetchOrders(orderStatus)
  );

  return {
    fetchedOrders,
    isLoading,
  };
};

export const useCreateOrder = ({ handleSuccess }: UseCreateOrder) => {
  const { showToast } = useSnackbar();
  const { isLoading: isCreating, mutate: createOrder } = useMutation(
    orderApi.createNewOrder,
    {
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

export const useDeleteOrder = (orderStatus: OrderStatusType) => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const [deletingId, setDeletingId] = useState("");
  const { mutate: removeOrder } = useMutation(orderApi.deleteOrder, {
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", orderStatus]);
      showToast({
        title: "Xóa đơn hàng thành công!",
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
    onError: () => {
      showToast({
        title: "Xóa đơn hàng không thành công",
        type: "error",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
    onSettled: () => {
      setDeletingId("");
    },
  });

  return {
    deletingId,
    removeOrder,
  };
};
