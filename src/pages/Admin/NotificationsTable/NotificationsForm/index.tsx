import {
  Button,
  CircularProgress,
  FormHelperText,
  Input,
  Stack,
} from "@mui/material";
import {
  useClearNotificationImage,
  useUpdateNotification,
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
  const fetchedImageUrl = item.imageUrl;
  const isAddingNew = !item.id;
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const watchImage = watch("image");
  const [imageUrl, setImageUrl] = useState("");
  const { uploadNotification, isSubmiting } = useUploadNotification(onClose);
  const { isUploadingImage, uploadNotificationImage } =
    useUploadNotificationImage(isAddingNew);
  const { isUpdating, updateNotification } = useUpdateNotification(onClose);
  const { isRemovingImg, clearNotificationImage } = useClearNotificationImage();
  const isLoading =
    isSubmiting || isUploadingImage || isUpdating || isRemovingImg;

  const handleFormSubmit = async ({
    title,
    description,
    url,
  }: {
    [key: string]: string;
  }) => {
    const imageFile = watchImage && watchImage[0];
    const imageUrl = imageFile
      ? await uploadNotificationImage(imageFile)
      : fetchedImageUrl;

    if (imageFile && fetchedImageUrl) {
      await clearNotificationImage(fetchedImageUrl);
    }

    if (isAddingNew) {
      uploadNotification({
        title,
        description,
        imageUrl: imageUrl!,
        isPublished: true,
        url,
      });
    } else {
      updateNotification({
        id: item.id!,
        data: {
          title,
          description,
          imageUrl: imageUrl!,
          isPublished: true,
          url,
        },
      });
    }
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
      <FormControl
        sx={{ gridTemplateColumns: "1fr 2.5fr", columnGap: "2.4rem" }}
      >
        <FormLabel>Tiêu đề:</FormLabel>
        <TextField
          defaultValue={item && item.title}
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

      <FormControl
        sx={{ gridTemplateColumns: "1fr 2.5fr", columnGap: "2.4rem" }}
      >
        <FormLabel>Link sản phẩm:</FormLabel>
        <TextField
          defaultValue={item && item.url}
          error={Boolean(errors.url)}
          helperText={errors.url?.message}
          {...register("url", {
            required: {
              value: true,
              message: "Link sản phẩm không được bỏ trống",
            },
          })}
        />
      </FormControl>

      <FormControl
        sx={{ gridTemplateColumns: "1fr 2.5fr", columnGap: "2.4rem" }}
      >
        <FormLabel>Hình ảnh:</FormLabel>
        <Stack alignItems="flex-start" spacing={3}>
          <FileInputButton htmlFor="photo" focused={false}>
            Tải ảnh lên
          </FileInputButton>

          {(!!imageUrl || fetchedImageUrl) && (
            <ImageInputContainer>
              <img src={imageUrl || fetchedImageUrl} alt="Anh" />
            </ImageInputContainer>
          )}

          <Input
            type="file"
            id="photo"
            sx={{ pointerEvents: "none", position: "absolute", opacity: 0 }}
            {...register("image", {
              required: {
                value: !fetchedImageUrl && !!imageUrl,
                message: "Sản phẩm đang chưa có ảnh",
              },
            })}
          />
          <FormHelperText error={Boolean(errors.image)}>
            {errors.image?.message}
          </FormHelperText>
        </Stack>
      </FormControl>

      <FormControl
        sx={{ gridTemplateColumns: "1fr 2.5fr", columnGap: "2.4rem" }}
      >
        <FormLabel>Nội dung:</FormLabel>
        <MultilineTextField
          defaultValue={item && item.description}
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
        <Button variant="contained" type={isLoading ? "button" : "submit"}>
          {!isLoading && (isAddingNew ? "Thêm mới" : "Cập nhật")}
          {isLoading && <CircularProgress color="inherit" size="1.6rem" />}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Trở lại
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotificationsForm;
