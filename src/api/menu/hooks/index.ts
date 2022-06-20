import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { FirebaseQuery, MenuType } from "shared/types";
import { adminLoginState } from "states/admin";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { menuApi } from "..";

export const useFetchMenuItem = (type: string, id: string) => {
  const {
    data: fetchedItem,
    isLoading: isGettingData,
    isError,
  } = useQuery(["menu", { type, id }], () => menuApi.fetchMenuItem(type, id));

  return { fetchedItem, isGettingData, isError };
};

export const useFetchedMenu = (tableType: string) => {
  const adminState = useRecoilValue(adminLoginState);
  const queries: FirebaseQuery<boolean>[] = !adminState
    ? [{ field: "isPublished", condition: "==", value: true }]
    : [];

  const { data: fetchedMenu, isLoading: isGettingData } = useQuery(
    ["menu", tableType],
    () => menuApi.fetchAllMenuItems(tableType, queries)
  );

  return { fetchedMenu, isGettingData };
};

export const useRemoveMenuItem = (tableType: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const [deletingId, setDeletingId] = useState("");
  const { mutate: removeMenuItem } = useMutation(menuApi.deleteMenuItem, {
    onMutate: (data: { id: string }) => {
      setDeletingId(data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", tableType]);
      showToast({
        title: "Xóa sản phẩm thành công!",
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
    onError: () => {
      showToast({
        title: "Xóa sản phẩm không thành công",
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
    removeMenuItem,
  };
};

export const useUploadNewMenu = (tableType: string, closeForm: () => void) => {
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const {
    mutate: uploadNewMenu,
    isLoading: isSubmiting,
    isSuccess,
    isError,
  } = useMutation((data: MenuType) => menuApi.createNewMenu(tableType, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", tableType]);
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
  });

  return {
    uploadNewMenu,
    isSubmiting,
    submitIsStoped: isSuccess || isError,
  };
};

export const useUpdateMenu = (tableType: string, closeForm?: () => void) => {
  const { updateMenu: updateMenuApi } = menuApi;
  const queryClient = useQueryClient();
  const { showToast } = useSnackbar();
  const [updatingId, setUpdatingId] = useState("");

  const {
    mutate: updateMenu,
    isLoading: isUpdating,
    isSuccess,
    isError,
  } = useMutation(updateMenuApi, {
    onMutate: ({ id }) => {
      setUpdatingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", tableType]);
      if (closeForm) {
        closeForm();
      }
      showToast({
        title: "Cập nhật sản phẩm thành công!",
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
    onError: () => {
      showToast({
        title: "Cập nhật sản phẩm không thành công!",
        type: "error",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
    onSettled: () => {
      setUpdatingId("");
    },
  });

  return {
    updateMenu,
    updatingId,
    isUpdating,
    updateIsStoped: isSuccess || isError,
  };
};

export const useUploadImage = (isAddingNew: boolean) => {
  const { showToast } = useSnackbar();
  const { mutateAsync: uploadImage, isLoading: isUploadingImage } = useMutation(
    menuApi.createMenuImageUrl,
    {
      onError: () => {
        showToast({
          title: `${isAddingNew ? "Thêm" : "Cập nhật"} sản phẩm ${
            isAddingNew ? "mới" : ""
          } không thành công!"`,
          type: "error",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );

  return {
    uploadImage,
    isUploadingImage,
  };
};

export const useClearImage = () => {
  const { showToast } = useSnackbar();
  const { mutateAsync: clearImage } = useMutation(menuApi.deleteMenuImage, {
    onError: () => {
      showToast({
        title: "Cập nhật sản phẩm không thành công!",
        type: "error",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
  });

  return {
    clearImage,
  };
};

export const useGetHomePageMenu = (menuType: string) => {
  const adminState = useRecoilValue(adminLoginState);
  const queries: FirebaseQuery<boolean>[] = !adminState
    ? [{ field: "isPublished", condition: "==", value: true }]
    : [];
  const { data: fetchedMenu, isLoading: isGettingData } = useQuery(
    ["home-menu", menuType],
    () => menuApi.fetchAllMenuItems(menuType, queries, 3)
  );

  return { fetchedMenu, isGettingData };
};
