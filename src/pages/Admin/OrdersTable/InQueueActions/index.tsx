import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface InQueueActionsProps {
  isDeleting: boolean;
  onShowDetail: () => void;
  onRemoveOrder: () => void;
}

const InQueueActions = ({
  isDeleting,
  onShowDetail,
  onRemoveOrder,
}: InQueueActionsProps) => {
  return (
    <>
      <Button variant="contained" onClick={onShowDetail}>
        Xem đơn hàng
      </Button>

      <Button variant="outlined" color="error" onClick={onRemoveOrder}>
        {isDeleting ? <CircularProgress size={16} /> : "Hủy"}
      </Button>
    </>
  );
};

export default InQueueActions;
