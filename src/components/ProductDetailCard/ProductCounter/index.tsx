import React from "react";
import { Stack, Button, Typography } from "@mui/material";

const ProductCounter = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Typography variant="h6">Số lượng:</Typography>

      <Stack direction="row" spacing={3}>
        <Button sx={{ px: 0, minWidth: "3.4rem" }} variant="outlined">
          -
        </Button>

        <Typography variant="h6" sx={{ mb: 2, lineHeight: 1.8 }}>
          {1}
        </Typography>

        <Button sx={{ px: 0, minWidth: "3.4rem" }} variant="outlined">
          +
        </Button>
      </Stack>
    </Stack>
  );
};

export default React.memo(ProductCounter);
