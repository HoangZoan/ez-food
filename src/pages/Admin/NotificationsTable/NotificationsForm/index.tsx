import { Button, FormHelperText, Input, Stack } from "@mui/material";
import {
  useUploadNotification,
  useUploadNotificationImage,
} from "api/notifications/hooks";
import FileInputButton from "components/UI/FileInputButton";
import {
  FormControl,
  FormLabel,
  MultilineTextField,
  TextField,
} from "components/UI/FormComponents";
import ImageInputContainer from "components/UI/ImageInputContainer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NotificationListType } from "shared/types";

interface NotificationsFormProps {
  onClose: () => void;
  item: NotificationListType | Partial<NotificationListType>;
}

const NotificationsForm = ({ item, onClose }: NotificationsFormProps) => {
  const isAddingNew = Boolean(item);
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const watchImage = watch("image");
  const { uploadNotification, isSubmiting } = useUploadNotification(onClose);
  const { isUploadingImage, uploadNotificationImage } =
    useUploadNotificationImage(isAddingNew);
  const [imageUrl, setImageUrl] = useState("");

  const handleFormSubmit = async ({
    title,
    description,
  }: {
    [key: string]: string;
  }) => {
    const imageFile = watchImage[0];
    const imageUrl = await uploadNotificationImage(imageFile);

    uploadNotification({ title, description, imageUrl, isPublished: true });
  };

  useEffect(() => {
    if (!watchImage || watchImage?.length === 0) {
      setImageUrl("");
      return;
    }

    setImageUrl(URL.createObjectURL(watchImage[0]));
  }, [watchImage]);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      spacing={3}
      sx={{ backgroundColor: "white", px: 6, py: 5, minWidth: "54rem" }}
    >
      <FormControl sx={{ gridTemplateColumns: "1fr 3fr", columnGap: "2.4rem" }}>
        <FormLabel>Tiêu đề:</FormLabel>
        <TextField
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          {...register("title", {
            required: {
              value: true,
              message: "Tên tiêu đề không được bỏ trống",
            },
          })}
        />
      </FormControl>
      <FormControl sx={{ gridTemplateColumns: "1fr 3fr", columnGap: "2.4rem" }}>
        <FormLabel>Hình ảnh:</FormLabel>
        <Stack alignItems="flex-start" spacing={3}>
          <FileInputButton htmlFor="photo" focused={false}>
            Tải ảnh lên
          </FileInputButton>

          {imageUrl.length > 0 && (
            <ImageInputContainer>
              <img src={imageUrl} alt="Anh" />
            </ImageInputContainer>
          )}

          <Input
            type="file"
            id="photo"
            sx={{ pointerEvents: "none", position: "absolute", opacity: 0 }}
            {...register("image", {
              required: {
                value: true,
                message: "Sản phẩm đang chưa có ảnh",
              },
            })}
          />
          <FormHelperText error={Boolean(errors.image)}>
            {errors.image?.message}
          </FormHelperText>
          {/* <FormHelperText></FormHelperText> */}
        </Stack>
      </FormControl>
      <FormControl sx={{ gridTemplateColumns: "1fr 3fr", columnGap: "2.4rem" }}>
        <FormLabel>Nội dung:</FormLabel>
        <MultilineTextField
          minRows={3}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          {...register("description", {
            required: {
              value: true,
              message: "Nội dung thông báo không được bỏ trống",
            },
          })}
        />
      </FormControl>

      <Stack direction="row" justifyContent="center" spacing={4} sx={{ pt: 5 }}>
        <Button variant="contained" type="submit">
          {isAddingNew ? "Thêm mới" : "Cập nhật"}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Trở lại
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotificationsForm;
