import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import MenuFormControl from "../MenuFormControl";
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
  UseFormResetField,
} from "react-hook-form";
import { OptionsType } from "shared/types";
import VariantField from "../VariantField";

interface OptionsFieldProps {
  register: UseFormRegister<FieldValues>;
  index: number;
  errors: {
    [x: string]: any;
  };
  option?: OptionsType;
  getValues: UseFormGetValues<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
}

const OptionsField = ({
  register,
  index,
  errors,
  option,
  getValues,
  resetField,
}: OptionsFieldProps) => {
  const [variantsState, setVariantsState] = useState(
    option ? option.variants : []
  );
  const [newSelectLength, setNewSelectLength] = useState(option ? 0 : 2);
  const generatedSelectArr = Array.from(new Array(newSelectLength).keys());

  const handleAddSelect = () => {
    setNewSelectLength((oldState) => oldState + 1);
  };

  const handleRemoveSelect = () => {
    const resetRemovedFields = (optionIndex: number, optionLength: number) => {
      const formKeys = Object.keys(getValues());
      const targetArr = formKeys.filter(
        (key) =>
          key.match(`variant-${optionIndex}-${optionLength - 1}`) ||
          key.match(`varPrice-${optionIndex}-${optionLength - 1}`)
      );

      targetArr.forEach((tarKey) => resetField(tarKey));
    };

    if (option && newSelectLength > 0) {
      resetRemovedFields(index, newSelectLength + variantsState.length);
      setNewSelectLength((oldState) => oldState - 1);
    } else if (option && variantsState.length > 2) {
      resetRemovedFields(index, variantsState.length);
      setVariantsState((oldState) => oldState.slice(0, -1));
    } else if (!option && newSelectLength > 2) {
      resetRemovedFields(index, newSelectLength);
      setNewSelectLength((oldState) => oldState - 1);
    }
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
          {variantsState.map((variant, i) => (
            <VariantField
              key={i}
              variantKey={i}
              optionIndex={index}
              register={register}
              errors={errors}
              variant={variant}
            />
          ))}
          {generatedSelectArr.map((key) => (
            <VariantField
              key={key}
              variantKey={option ? option.variants.length + key : key}
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
            {((option && option.variants.length + newSelectLength > 2) ||
              newSelectLength > 2) && (
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
