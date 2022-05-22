import { Stack, Typography } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import React from "react";
import MenuFormControl from "../MenuFormControl";

const SideDishField = () => {
  return (
    <>
      <MenuFormControl>
        <FormLabel>Đồ gọi thêm:</FormLabel>
        <TextField />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Giá:</FormLabel>

        <Stack direction="row" spacing={3}>
          <TextField defaultValue={0} type="number" sx={{ width: 1 / 4 }} />
          <Typography>(nghìn VNĐ)</Typography>
        </Stack>
      </MenuFormControl>
    </>
  );
};

export default SideDishField;
