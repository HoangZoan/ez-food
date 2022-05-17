import { Button, Stack, SxProps, Typography } from "@mui/material";
import React from "react";

interface ConfirmationBoxProps {
  title: string | React.ReactNode;
  actionLabel?: string;
  cancelLabel?: string;
  onAction: () => void;
  onCancel: () => void;
  sx?: SxProps;
}

const ConfirmationBox = ({
  title,
  actionLabel = "Đồng ý",
  cancelLabel = "Trở lại",
  onAction,
  onCancel,
  sx,
}: ConfirmationBoxProps) => {
  return (
    <Stack sx={sx} alignItems="center" justifyContent="center">
      <Typography variant="h6" sx={{ mb: 4 }}>
        {title}
      </Typography>

      <Stack direction="row" spacing={4}>
        <Button variant="outlined" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="contained" color="error" onClick={onAction}>
          {actionLabel}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmationBox;
