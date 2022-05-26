import { FormControl, Grid, Typography } from "@mui/material";
import { FormLabel, TextField } from "components/UI/FormComponents";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { styled } from "shared/theme";
import { OptionVariantType } from "shared/types";

interface VariantFieldProps {
  optionIndex: number;
  variantKey: number;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  variant?: OptionVariantType;
}

const MenuOptionLabel = styled(FormLabel)({
  fontSize: "1.2rem",
  marginBottom: "0.4rem",
  fontWeight: 700,
});

const VariantField = ({
  optionIndex,
  variantKey,
  variant,
  errors,
  register,
}: VariantFieldProps) => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <FormControl>
          <MenuOptionLabel>
            Lựa chọn {variantKey === 0 ? "(Mặc định)" : ""}
          </MenuOptionLabel>
          <TextField
            defaultValue={variant && variant.type}
            error={Boolean(errors[`variant-${optionIndex}-${variantKey}`])}
            {...register(`variant-${optionIndex}-${variantKey}`, {
              required: {
                value: true,
                message: "Thông tin này không được bỏ trống",
              },
            })}
            helperText={errors[`variant-${optionIndex}-${variantKey}`]?.message}
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl>
          <MenuOptionLabel>Tăng thêm</MenuOptionLabel>
          <TextField
            inputProps={{ readOnly: variantKey === 0 }}
            defaultValue={variant ? variant.price / 1000 : 0}
            type="number"
            placeholder="Nghìn VNĐ"
            error={Boolean(errors[`varPrice-${optionIndex}-${variantKey}`])}
            {...register(`varPrice-${optionIndex}-${variantKey}`, {
              required: {
                value: true,
                message: "Đang bỏ trống",
              },
            })}
            helperText={
              errors[`varPrice-${optionIndex}-${variantKey}`]?.message
            }
          />
          <Typography variant="subtitle2">(nghìn VNĐ)</Typography>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default VariantField;
