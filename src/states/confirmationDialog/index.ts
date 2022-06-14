import React from "react";
import { atom } from "recoil";

export const confirmationDialogState = atom({
  key: "confirmationDialog",
  default: {
    show: false,
    content: "" as string | React.ReactNode,
    onConfirm: () => {},
  },
});

export const confirmationFinishOrderState = atom({
  key: "confirmationDialog",
  default: {
    show: false,
    content: "" as string | React.ReactNode,
    onConfirm: () => {},
  },
});
