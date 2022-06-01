import { Button } from "@mui/material";
import React from "react";

interface InQueueActionsProps {
  onShowDetail: () => void;
}

const InQueueActions = ({ onShowDetail }: InQueueActionsProps) => {
  return (
    <>
      <Button variant="contained" onClick={onShowDetail}>
        Chi tiết
      </Button>
      <Button variant="contained" color="success">
        Xong
      </Button>
      <Button variant="outlined" color="error">
        Xóa
      </Button>
    </>
  );
};

export default InQueueActions;
