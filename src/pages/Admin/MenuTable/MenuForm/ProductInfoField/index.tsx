import {
  Box,
  FormHelperText,
  Input,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import FileInputButton from "components/UI/FileInputButton";
import { FormLabel, TextField } from "components/UI/FormComponents";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { styled } from "shared/theme";
import MenuFormControl from "../MenuFormControl";

interface ProductInfoFieldProps {
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
}

const MenuFormSelect = styled(Select)({
  minWidth: "12rem",
  "& .MuiSelect-select": {
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
  },
});

const ProductInfoField = ({ register, errors }: ProductInfoFieldProps) => {
  return (
    <>
      <MenuFormControl>
        <FormLabel>Tên món:</FormLabel>
        <TextField
          error={Boolean(errors.title)}
          {...register("title", {
            required: { value: true, message: "Tên món không được bỏ trống" },
          })}
          helperText={errors.title?.message}
        />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Loại:</FormLabel>
        <Box>
          <MenuFormSelect defaultValue="single" {...register("menuType")}>
            <MenuItem value={"single"}>Món đơn</MenuItem>
            <MenuItem value={"combo"}>Combo</MenuItem>
          </MenuFormSelect>
        </Box>
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Hình ảnh:</FormLabel>
        <Box>
          <FileInputButton htmlFor="photo">Tải ảnh lên</FileInputButton>
          <Input type="file" id="photo" sx={{ display: "none" }} />
          {/* <FormHelperText></FormHelperText> */}
        </Box>
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Giá:</FormLabel>
        <Stack>
          <Stack direction="row" spacing={3}>
            <TextField
              type="number"
              error={Boolean(errors.price)}
              sx={{ width: 1 / 4 }}
              {...register("price", {
                required: { value: true, message: "Giá không được bỏ trống" },
              })}
            />
            <Typography>(nghìn VNĐ)</Typography>
          </Stack>

          <FormHelperText error>{errors.price?.message}</FormHelperText>
        </Stack>
      </MenuFormControl>
    </>
  );
};

export default ProductInfoField;
