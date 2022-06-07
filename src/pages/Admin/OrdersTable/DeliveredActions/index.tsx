import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  isDeleting: boolean;
  onShowDetail: () => void;
  onRemoveOrder: () => void;
}

const DeliveredActions = ({
  isDeleting,
  onShowDetail,
  onRemoveOrder,
}: Props) => {
  return (
    <>
      <Button variant="contained" onClick={onShowDetail}>
        Chi tiết
      </Button>
      <Button variant="outlined" color="error" onClick={onRemoveOrder}>
        {isDeleting ? <CircularProgress size={16} /> : "Hủy"}
      </Button>
    </>
  );
};

export default DeliveredActions;
