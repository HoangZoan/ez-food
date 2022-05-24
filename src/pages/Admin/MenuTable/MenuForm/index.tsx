import { Divider, Stack, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { MenuType, ProductDetailType } from "shared/types";
import { convertProductFormData } from "shared/utils";
import { productDetailState } from "states/productDetail";
import FieldActions from "./FieldActions";
import OptionsField from "./OptionsField";
import ProductInfoField from "./ProductInfoField";
import SideDishField from "./SideDishField";
import { FirestoreService } from "../../../../firebase/firestoreService";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { menuItemImageState } from "states/menu";
import { IMAGE_KEY } from "shared/config";
import { v4 as uuidv4 } from "uuid";
import { StorageService } from "../../../../firebase/storageService";

interface MenuFormProps {
  onClose: () => void;
  item?: ProductDetailType;
  itemType: string;
}

const MenuForm = ({ onClose, item, itemType }: MenuFormProps) => {
  const isAddingNew = !Boolean(item);
  const { options } = useRecoilValue(productDetailState);
  const imageFile = useRecoilValue(menuItemImageState);
  const [newOptionsLength, setNewOptionsLength] = useState(0);
  const [newSideDishLength, setNewSideDishLength] = useState(0);
  const generatedOptionsArr = Array.from(new Array(newOptionsLength).keys());
  const generatedSideDishArr = Array.from(new Array(newSideDishLength).keys());
  const queryClient = useQueryClient();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    resetField,
  } = useForm();
  const { showToast } = useSnackbar();
  const formKeys = Object.keys(getValues());
  const {
    mutate: uploadNewMenu,
    isLoading: isSubmiting,
    isSuccess: submitIsSuccess,
  } = useMutation(
    (data: MenuType) =>
      FirestoreService.createDocument(`menu/products/${itemType}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menu", itemType]);
        onClose();
        showToast({
          title: "Thêm sản phẩm mới thành công!",
          type: "success",
          SnackbarProps: {
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          },
        });
      },
    }
  );
  const { mutateAsync: uploadImage, isLoading: isUploading } = useMutation(
    async () => {
      const imageName = IMAGE_KEY + uuidv4();

      const imageDownloadUrl = (await StorageService.uploadFile(
        imageFile,
        `products/${imageName}`
      )) as string;

      return imageDownloadUrl;
    }
  );

  // const { mutate: clearImages, isLoading: isClearing } = useMutation(
  //   async () => {
  //     await StorageService.deleteFile(imageUrl);
  //     setImageUrl("");
  //   }
  // );

  const isLoading = isUploading || isSubmiting;

  const handleFormSubmit = async (data: { [key: string]: string }) => {
    const { title, price, menuType } = data;
    const { options, sideDish } = convertProductFormData(data);
    const imageUrl = await uploadImage();

    const submitData = {
      title,
      price: Number(price) * 1000,
      menuType,
      options,
      sideDish,
      itemType,
      imageUrl,
      isPublished: true,
    };

    uploadNewMenu(submitData);
  };

  const handleAddNewOptionFields = () => {
    setNewOptionsLength((oldState) => oldState + 1);
  };

  const handleRemoveNewOptionFields = () => {
    setNewOptionsLength((oldState) => oldState - 1);

    const targetArr = formKeys.filter(
      (key) =>
        key.match(`select-${newOptionsLength - 1}`) ||
        key.match(`variant-${newOptionsLength - 1}`) ||
        key.match(`varPrice-${newOptionsLength - 1}`)
    );

    targetArr.forEach((tarKey) => resetField(tarKey));
  };

  const handleAddNewSideDishFields = () => {
    setNewSideDishLength((oldState) => oldState + 1);
  };

  const handleRemoveNewSideDishFields = () => {
    setNewSideDishLength((oldState) => oldState - 1);

    const targetArr = formKeys.filter(
      (key) =>
        key.match(`sideDish-${newSideDishLength - 1}`) ||
        key.match(`side-price-${newSideDishLength - 1}`)
    );

    targetArr.forEach((tarKey) => resetField(tarKey));
  };

  return (
    <Stack
      spacing={3}
      sx={{ px: 6, py: 5 }}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <ProductInfoField
        register={register}
        watch={watch}
        errors={errors}
        submitIsSuccess={submitIsSuccess}
      />

      <Divider />

      {/* <OptionsField /> */}
      {options.length === 0 &&
        generatedOptionsArr.map((key) => (
          <OptionsField
            key={key}
            index={key}
            register={register}
            errors={errors}
          />
        ))}

      <FieldActions
        addLabel="+ Tùy chọn"
        onAdd={handleAddNewOptionFields}
        onRemove={handleRemoveNewOptionFields}
        showRemove={newOptionsLength > 0}
      />

      <Divider />

      {/* <SideDishField /> */}
      {generatedSideDishArr.map((key) => (
        <SideDishField
          key={key}
          index={key}
          register={register}
          errors={errors}
        />
      ))}

      <FieldActions
        addLabel="+ Đồ gọi thêm"
        onAdd={handleAddNewSideDishFields}
        onRemove={handleRemoveNewSideDishFields}
        showRemove={newSideDishLength > 0}
      />

      <Stack
        direction="row"
        justifyContent="center"
        spacing={5}
        sx={{ pt: 5, color: (theme) => theme.colors.background.primary }}
      >
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

export default MenuForm;
