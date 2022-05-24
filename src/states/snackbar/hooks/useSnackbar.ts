import { AlertColor, SnackbarProps as MuiSnackbarProps } from "@mui/material";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { defaultSnackbarState, snackbarState } from "..";

interface showToastPamrams {
  title: string;
  type: AlertColor;
  SnackbarProps?: MuiSnackbarProps;
}

type showToastType = (params: showToastPamrams) => void;

export const useSnackbar = () => {
  const setState = useSetRecoilState(snackbarState);

  const showToast: showToastType = useCallback(
    ({ title, type, SnackbarProps }) => {
      setState({ show: true, title, type, SnackbarProps: SnackbarProps || {} });
    },
    [setState]
  );

  const closeToast = () => {
    setState(defaultSnackbarState);
  };

  return { showToast, closeToast };
};
