import React, { useEffect, useMemo } from "react";
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
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { styled } from "shared/theme";
import MenuFormControl from "../MenuFormControl";
import { IMAGE_KEY } from "../../../../../shared/config";
import { StorageService } from "../../../../../firebase/storageService";
import { v4 as uuid4 } from "uuid";
import { useMutation } from "react-query";

interface ProductInfoFieldProps {
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const MenuFormSelect = styled(Select)({
  minWidth: "12rem",
  "& .MuiSelect-select": {
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
  },
});

const ProductInfoField = ({
  register,
  errors,
  watch,
  imageUrls: imageUrlsState,
  setImageUrls,
}: ProductInfoFieldProps) => {
  const watchImage = watch("image");
  const imageFolder = useMemo(() => IMAGE_KEY + "-" + uuid4(), []);
  const { mutate: uploadImages, isLoading: isUploading } = useMutation(
    async () => {
      const callingPromises = Array.from(watchImage).map((file) => {
        const imageName = uuid4();

        return StorageService.uploadFile(
          file,
          `products/${imageFolder}/${imageName}`
        );
      });

      const imageUrls = (await Promise.all([...callingPromises])) as string[];

      setImageUrls(imageUrls);
    }
  );
  const { mutate: clearImages, isLoading: isClearing } = useMutation(
    async () => {
      const callingPromises = imageUrlsState.map((url) =>
        StorageService.deleteFile(url)
      );

      await Promise.all([...callingPromises]);
    }
  );
  const loading = isUploading || isClearing;

  useEffect(() => {
    if (!watchImage) return;

    uploadImages();

    return () => clearImages();
  }, [watchImage, uploadImages, clearImages]);

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
          <FileInputButton disabled={loading} htmlFor={loading ? "" : "photo"}>
            {loading ? "Đang tải..." : "Tải ảnh lên"}
          </FileInputButton>

          <Input
            type="file"
            id="photo"
            inputProps={{ multiple: true }}
            sx={{ display: "none" }}
            {...register("image", {
              required: { value: true, message: "Sản phẩm đang chưa có ảnh" },
            })}
          />
          <FormHelperText error={Boolean(errors.image)}>
            {errors.image?.message}
          </FormHelperText>
        </Box>
      </MenuFormControl>

      <MenuFormControl>
        <FormLabel>Giá:</FormLabel>
        <Stack>
          <Stack direction="row" spacing={3}>
            <TextField
              type="number"
              inputProps={{ min: 1 }}
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
