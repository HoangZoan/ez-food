import { Button } from "@mui/material";
import BadgePrimary from "components/UI/BadgePrimary";
import React from "react";

interface Props {
  show: boolean;
  disabled: boolean;
  ordersCount: number;
  onClick: () => void;
}

const UpdateOrdersButton = ({
  show,
  disabled,
  ordersCount,
  onClick,
}: Props) => {
  if (!show) return null;

  return (
    <BadgePrimary count={ordersCount}>
      <Button
        disabled={disabled}
        variant="contained"
        color="success"
        onClick={onClick}
        sx={{ height: "100%" }}
      >
        Đơn hàng mới
      </Button>
    </BadgePrimary>
  );
};

export default UpdateOrdersButton;
