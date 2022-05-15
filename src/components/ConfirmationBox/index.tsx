import { Button, Stack, Typography } from "@mui/material";
import React from "react";

interface ConfirmationBoxProps {
  title: string;
  actionLabel?: string;
  cancelLabel?: string;
  onAction: () => void;
  onCancel: () => void;
}

const ConfirmationBox = ({
  title,
  actionLabel = "Đồng ý",
  cancelLabel = "Trở lại",
  onAction,
  onCancel,
}: ConfirmationBoxProps) => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography variant="h6" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Stack direction="row" spacing={4}>
        <Button variant="outlined" onClick={onAction}>
          {cancelLabel}
        </Button>
        <Button variant="contained" color="error" onClick={onCancel}>
          {actionLabel}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmationBox;
