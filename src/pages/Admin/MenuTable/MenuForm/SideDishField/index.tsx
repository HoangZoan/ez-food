import { Stack, Typography } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import MenuFormControl from "../MenuFormControl";

interface SideDishFieldProps {
  index: number;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
}

const SideDishField = ({ index, register, errors }: SideDishFieldProps) => {
  return (
    <>
      <MenuFormControl>
        <FormLabel>Đồ gọi thêm:</FormLabel>
        <TextField
          error={Boolean(errors[`sideDish-${index}`])}
          {...register(`sideDish-${index}`, {
            required: {
              value: true,
              message: "Thông tin này không được bỏ trống",
            },
          })}
          helperText={errors[`sideDish-${index}`]?.message}
        />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Giá:</FormLabel>

        <Stack direction="row" spacing={3}>
          <TextField
            defaultValue={0}
            type="number"
            inputProps={{ min: 0 }}
            sx={{ width: 1 / 4 }}
            error={Boolean(errors[`side-price-${index}`])}
            {...register(`side-price-${index}`, {
              required: {
                value: true,
                message: "Đang bỏ trống",
              },
            })}
            helperText={errors[`side-price-${index}`]?.message}
          />
          <Typography>(nghìn VNĐ)</Typography>
        </Stack>
      </MenuFormControl>
    </>
  );
};

export default SideDishField;
