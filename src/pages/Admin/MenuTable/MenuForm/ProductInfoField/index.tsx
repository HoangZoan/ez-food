import React, { useEffect, useState } from "react";
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
import { useSetRecoilState } from "recoil";
import { menuItemImageState } from "states/menu";

interface ProductInfoFieldProps {
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  submitIsSuccess: boolean;
}

const MenuFormSelect = styled(Select)({
  minWidth: "12rem",
  "& .MuiSelect-select": {
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
  },
});

const ImageContainer = styled(Box)({
  width: "9.6rem",
  height: "9.6rem",
  "& img": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

const ProductInfoField = ({
  register,
  errors,
  watch,
}: ProductInfoFieldProps) => {
  const setImageFile = useSetRecoilState(menuItemImageState);
  const [imageUrl, setImageUrl] = useState("");
  const watchImage = watch("image");
  // const { mutate: uploadImage, isLoading: isUploading } = useMutation(
  //   async () => {
  //     const file = watchImage[0];
  //     const imageName = IMAGE_KEY + uuidv4();

  //     const imageDownloadUrl = (await StorageService.uploadFile(
  //       file,
  //       `products/${imageName}`
  //     )) as string;

  //     setImageUrl(imageDownloadUrl);
  //   }
  // );
  // const { mutate: clearImages, isLoading: isClearing } = useMutation(
  //   async () => {
  //     await StorageService.deleteFile(imageUrl);
  //     setImageUrl("");
  //   }
  // );

  useEffect(() => {
    if (!watchImage || watchImage?.length === 0) return;

    setImageUrl(URL.createObjectURL(watchImage[0]));
    setImageFile(watchImage[0]);
  }, [watchImage, setImageUrl, setImageFile]);

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
        <Stack alignItems="flex-start" spacing={3}>
          <FileInputButton htmlFor="photo" focused={false}>
            Thay đổi ảnh
          </FileInputButton>

          {imageUrl.length > 0 && (
            <ImageContainer>
              <img src={imageUrl} alt="Anh" />
            </ImageContainer>
          )}

          <Input
            type="file"
            id="photo"
            sx={{ pointerEvents: "none", position: "absolute", opacity: 0 }}
            {...register("image", {
              required: { value: true, message: "Sản phẩm đang chưa có ảnh" },
            })}
          />
          <FormHelperText error={Boolean(errors.image)}>
            {errors.image?.message}
          </FormHelperText>
        </Stack>
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
