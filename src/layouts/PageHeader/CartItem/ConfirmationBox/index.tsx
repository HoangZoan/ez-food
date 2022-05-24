import { Button, Stack, Typography } from "@mui/material";
import React from "react";

interface ConfirmationBoxProps {
  title: string | React.ReactNode;
  onAction: () => void;
  onCancel: () => void;
}

const ConfirmationBox = ({
  title,
  onAction,
  onCancel,
}: ConfirmationBoxProps) => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography variant="h6" sx={{ mb: 4 }}>
        {title}
      </Typography>

      <Stack direction="row" spacing={4}>
        <Button variant="contained" color="error" onClick={onAction}>
          Đồng ý
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Trở lại
        </Button>
      </Stack>
    </Stack>
  );
};

export default ConfirmationBox;
