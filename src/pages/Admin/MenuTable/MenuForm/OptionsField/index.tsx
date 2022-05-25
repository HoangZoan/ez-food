import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import MenuFormControl from "../MenuFormControl";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { OptionsType } from "shared/types";
import VariantField from "../VariantField";

interface OptionsFieldProps {
  register: UseFormRegister<FieldValues>;
  index: number;
  errors: {
    [x: string]: any;
  };
  option?: OptionsType;
}

const OptionsField = ({
  register,
  index,
  errors,
  option,
}: OptionsFieldProps) => {
  const [newSelectLength, setNewSelectLength] = useState(2);
  const generatedSelectArr = Array.from(new Array(newSelectLength).keys());

  const handleAddSelect = () => {
    setNewSelectLength((oldState) => oldState + 1);
  };

  const handleRemoveSelect = () => {
    setNewSelectLength((oldState) => oldState - 1);
  };

  return (
    <>
      <MenuFormControl>
        <FormLabel>Tên lựa chọn:</FormLabel>
        <TextField
          defaultValue={option && option.name}
          error={Boolean(errors[`select-${index}`])}
          {...register(`select-${index}`, {
            required: {
              value: true,
              message: "Thông tin này không được bỏ trống",
            },
          })}
          helperText={errors[`select-${index}`]?.message}
        />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Các lựa chọn:</FormLabel>
        <Stack spacing={1}>
          {option &&
            option.variants.map((variant, i) => (
              <VariantField
                key={i}
                variantKey={i}
                optionIndex={index}
                register={register}
                errors={errors}
                variant={variant}
              />
            ))}
          {!option &&
            generatedSelectArr.map((key) => (
              <VariantField
                key={key}
                variantKey={key}
                optionIndex={index}
                register={register}
                errors={errors}
              />
            ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              sx={{ fontSize: "1.2rem", mt: 0 }}
              onClick={handleAddSelect}
            >
              + Thêm lựa chọn
            </Button>
            {newSelectLength > 2 && (
              <Button
                sx={{ fontSize: "1.2rem", mt: 0 }}
                onClick={handleRemoveSelect}
                color="error"
              >
                - Bớt lựa chọn
              </Button>
            )}
          </Stack>
        </Stack>
      </MenuFormControl>
    </>
  );
};

export default OptionsField;
