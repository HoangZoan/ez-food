import { atom } from "recoil";
import { AlertColor, SnackbarProps as MuiSnackbarProps } from "@mui/material";

export const defaultSnackbarState = {
  show: false,
  title: "",
  SnackbarProps: {} as MuiSnackbarProps,
  type: "success" as AlertColor,
};

export const snackbarState = atom({
  key: "snackbar",
  default: defaultSnackbarState,
});
