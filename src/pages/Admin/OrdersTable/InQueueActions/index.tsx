import { Button } from "@mui/material";
import React from "react";

interface InQueueActionsProps {
  onShowDetail: () => void;
}

const InQueueActions = ({ onShowDetail }: InQueueActionsProps) => {
  return (
    <>
      <Button variant="contained" onClick={onShowDetail}>
        Xem đơn hàng
      </Button>

      <Button variant="outlined" color="error">
        Hủy
      </Button>
    </>
  );
};

export default InQueueActions;
