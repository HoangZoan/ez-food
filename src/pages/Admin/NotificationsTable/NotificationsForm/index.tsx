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
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl!,
        isPublished: true,
        url: url.trim(),
      });
    } else {
      updateNotification({
        id: item.id!,
        data: {
          title: title.trim(),
          description: description.trim(),
          imageUrl: imageUrl!,
          isPublished: true,
          url: url.trim(),
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
        <FormLabel>Ti??u ?????:</FormLabel>
        <TextField
          defaultValue={item && item.title}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          {...register("title", {
            required: {
              value: true,
              message: "T??n ti??u ????? kh??ng ???????c b??? tr???ng",
            },
          })}
        />
      </FormControl>

      <FormControl
        sx={{ gridTemplateColumns: "1fr 2.5fr", columnGap: "2.4rem" }}
      >
        <FormLabel>Link s???n ph???m:</FormLabel>
        <TextField
          defaultValue={item && item.url}
          error={Boolean(errors.url)}
          helperText={errors.url?.message}
          {...register("url", {
            required: {
              value: true,
              message: "Link s???n ph???m kh??ng ???????c b??? tr???ng",
            },
          })}
        />
      </FormControl>

      <FormControl
        sx={{ gridTemplateColumns: "1fr 2.5fr", columnGap: "2.4rem" }}
      >
        <FormLabel>H??nh ???nh:</FormLabel>
        <Stack alignItems="flex-start" spacing={3}>
          <FileInputButton htmlFor="photo" focused={false}>
            T???i ???nh l??n
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
                message: "S???n ph???m ??ang ch??a c?? ???nh",
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
        <FormLabel>N???i dung:</FormLabel>
        <MultilineTextField
          defaultValue={item && item.description}
          minRows={3}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          {...register("description", {
            required: {
              value: true,
              message: "N???i dung th??ng b??o kh??ng ???????c b??? tr???ng",
            },
            maxLength: {
              value: 140,
              message: "M?? t??? kh??ng ???????c d??i qu?? 140 k?? t???",
            },
          })}
        />
      </FormControl>

      <Stack direction="row" justifyContent="center" spacing={4} sx={{ pt: 5 }}>
        <Button variant="contained" type={isLoading ? "button" : "submit"}>
          {!isLoading && (isAddingNew ? "Th??m m???i" : "C???p nh???t")}
          {isLoading && <CircularProgress color="inherit" size="1.6rem" />}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Tr??? l???i
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotificationsForm;
