import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NotificationListType } from "shared/types";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { notificationsApi } from "..";

export const useFetchedNotifications = () => {
  const { data: fetchedNotifications, isLoading: isGettingData } = useQuery(
    "menu",
    () => notificationsApi.fetchAllNotifications()
  );

  return { fetchedNotifications, isGettingData };
};

export const useRemoveNotification = () => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const [deletingId, setDeletingId] = useState("");
  const { mutate: removeNotification } = useMutation(
    notificationsApi.deleteNotification,
    {
      onMutate: (data: { id: string }) => {
        setDeletingId(data.id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("menu");
        showToast({
          title: "Xóa thông báo thành công!",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
      onError: () => {
        showToast({
          title: "Xóa thông báo không thành công",
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
    deletingId,
    removeNotification,
  };
};

export const useUploadNotification = (closeForm: () => void) => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const { mutate: uploadNotification, isLoading: isSubmiting } = useMutation(
    (data: NotificationListType) =>
      notificationsApi.createNewNotification(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menu");
        closeForm();
        showToast({
          title: "Thêm sản phẩm mới thành công!",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
      onError: () => {
        showToast({
          title: "Thêm sản phẩm mới không thành công!",
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return {
    uploadNotification,
    isSubmiting,
  };
};

export const useUpdateNotification = (closeForm: () => void) => {
  const { updateNotification: updateNotificationApi } = notificationsApi;
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();

  const { mutate: updateNotification, isLoading: isUpdating } = useMutation(
    updateNotificationApi,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("menu");
        closeForm();
        showToast({
          title: "Cập nhật thông báo thành công!",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
      onError: () => {
        showToast({
          title: "Cập nhật thông báo không thành công!",
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return { updateNotification, isUpdating };
};

export const useUploadNotificationImage = (isAddingNew: boolean) => {
  const { showToast } = useSnackbar();
  const { mutateAsync: uploadNotificationImage, isLoading: isUploadingImage } =
    useMutation(notificationsApi.createNotificationImageUrl, {
      onError: () => {
        showToast({
          title: `${isAddingNew ? "Thêm" : "Cập nhật"} thông báo ${
            isAddingNew ? "mới" : ""
          } không thành công!"`,
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    });

  return {
    uploadNotificationImage,
    isUploadingImage,
  };
};

export const useClearNotificationImage = () => {
  const { showToast } = useSnackbar();
  const { mutateAsync: clearNotificationImage } = useMutation(
    notificationsApi.deleteNotificationImage,
    {
      onError: () => {
        showToast({
          title: "Cập nhật thông báo không thành công!",
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return {
    clearNotificationImage,
  };
};
