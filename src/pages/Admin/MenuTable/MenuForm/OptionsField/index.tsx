import { Button, FormControl, Grid, Stack, Typography } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import React, { useState } from "react";
import { styled } from "shared/theme";
import MenuFormControl from "../MenuFormControl";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface OptionsFieldProps {
  register: UseFormRegister<FieldValues>;
  index: number;
  errors: {
    [x: string]: any;
  };
}

const MenuOptionLabel = styled(FormLabel)({
  fontSize: "1.2rem",
  marginBottom: "0.4rem",
  fontWeight: 700,
});

const OptionsField = ({ register, index, errors }: OptionsFieldProps) => {
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
          {generatedSelectArr.map((key) => (
            <Grid container key={key}>
              <Grid item xs={8}>
                <FormControl>
                  <MenuOptionLabel>
                    Lựa chọn {key === 0 ? "(Mặc định)" : ""}
                  </MenuOptionLabel>
                  <TextField
                    error={Boolean(errors[`select-${index}`])}
                    {...register(`variant-${index}-${key}`, {
                      required: {
                        value: true,
                        message: "Thông tin này không được bỏ trống",
                      },
                    })}
                    helperText={errors[`variant-${index}-${key}`]?.message}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <MenuOptionLabel>Tăng thêm</MenuOptionLabel>
                  <TextField
                    inputProps={{ readOnly: key === 0 }}
                    defaultValue={0}
                    type="number"
                    placeholder="Nghìn VNĐ"
                    error={Boolean(errors[`var-price-${index}-${key}`])}
                    {...register(`var-price-${index}-${key}`, {
                      required: {
                        value: true,
                        message: "Đang bỏ trống",
                      },
                    })}
                    helperText={errors[`var-price-${index}-${key}`]?.message}
                  />
                  <Typography variant="subtitle2">(nghìn VNĐ)</Typography>
                </FormControl>
              </Grid>
            </Grid>
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
