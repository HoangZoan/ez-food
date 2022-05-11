import { Typography } from "@mui/material";
import React from "react";
import SelectToAddButton from "../SelectToAddButton";

const SideDishOption = () => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Gọi thêm:
      </Typography>

      <SelectToAddButton content="+ Lựa chọn" />
    </div>
  );
};

export default React.memo(SideDishOption);
