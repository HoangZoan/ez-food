import { Button, Tooltip, Typography } from "@mui/material";
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
      <Tooltip
        title={<Typography variant="body2">Cập nhật đơn hàng</Typography>}
        arrow
        placement="top"
        disableFocusListener={disabled}
        disableHoverListener={disabled}
        disableTouchListener={disabled}
      >
        <span>
          <Button
            disabled={disabled}
            variant="contained"
            color="success"
            onClick={onClick}
            sx={{ height: "100%" }}
          >
            Đơn hàng mới
          </Button>
        </span>
      </Tooltip>
    </BadgePrimary>
  );
};

export default UpdateOrdersButton;
