import React from "react";
import { atom } from "recoil";

export interface ConfirmationDialogType {
  show: boolean;
  content: string | React.ReactNode;
  onConfirm: () => void;
}

export const confirmationDialogState = atom<ConfirmationDialogType>({
  key: "confirmationDialog",
  default: {
    show: false,
    content: "",
    onConfirm: () => {},
  },
});
