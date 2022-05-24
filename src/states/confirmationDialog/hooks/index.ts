import React from "react";
import { useSetRecoilState } from "recoil";
import { confirmationDialogState } from "..";

interface openDialogParams {
  content: string | React.ReactNode;
  onConfirm: () => void;
}

export const useConfirmationDialog = () => {
  const setState = useSetRecoilState(confirmationDialogState);

  const openDialog = ({ content, onConfirm }: openDialogParams) => {
    setState({ show: true, content, onConfirm });
  };

  const closeDialog = () => {
    setState({ show: false, content: "", onConfirm: () => {} });
  };

  return {
    openDialog,
    closeDialog,
  };
};
