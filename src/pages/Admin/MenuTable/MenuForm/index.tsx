import { Divider, Stack, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { MenuType } from "shared/types";
import { convertProductFormData } from "shared/utils";
import FieldActions from "./FieldActions";
import OptionsField from "./OptionsField";
import ProductInfoField from "./ProductInfoField";
import SideDishField from "./SideDishField";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";
import { menuItemImageState } from "states/menu";
import { menuApi } from "api/menu";

interface MenuFormProps {
  onClose: () => void;
  item: MenuType | Partial<MenuType>;
  tableType: string;
}

const MenuForm = ({ onClose, item, tableType }: MenuFormProps) => {
  const {
    title,
    menuType,
    imageUrl: fetchedImageUrl,
    price,
    options,
    sideDish,
  } = item;
  const isAddingNew = !Boolean(item.id);
  const imageFile = useRecoilValue(menuItemImageState);
  const [optionsState, setOptionsState] = useState(options);
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
  const {
    mutate: uploadNewMenu,
    isLoading: isSubmiting,
    isSuccess: submitIsSuccess,
  } = useMutation((data: MenuType) => menuApi.createNewMenu(tableType, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["menu", tableType]);
      onClose();
      showToast({
        title: "Thêm sản phẩm mới thành công!",
        type: "success",
        SnackbarProps: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      });
    },
  });
  const { mutateAsync: uploadImage, isLoading: isUploading } = useMutation(
    menuApi.createMenuImageUrl
  );
  const { mutateAsync: clearImage } = useMutation(menuApi.deleteMenuImage);
  const isLoading = isUploading || isSubmiting;

  const handleFormSubmit = async (data: { [key: string]: string }) => {
    const { title, price, menuType } = data;
    const { options, sideDish } = convertProductFormData(data);
    // const imageUrl = imageFile
    //   ? await uploadImage(imageFile)
    //   : fetchedImageUrl!;

    // if (imageFile && fetchedImageUrl) {
    //   await clearImage(fetchedImageUrl);
    // }

    const submitData = {
      title,
      price: Number(price) * 1000,
      menuType,
      options,
      sideDish,
      itemType: tableType,
      // imageUrl,
      isPublished: true,
    };

    console.log(data);

    // uploadNewMenu(submitData);
  };

  const handleAddNewOptionFields = () => {
    setNewOptionsLength((oldState) => oldState + 1);
  };

  const handleRemoveOptionFields = () => {
    const resetRemovedFields = (optionLength: number) => {
      const formKeys = Object.keys(getValues());
      const targetArr = formKeys.filter(
        (key) =>
          key.match(`select-${optionLength - 1}`) ||
          key.match(`variant-${optionLength - 1}`) ||
          key.match(`varPrice-${optionLength - 1}`)
      );

      targetArr.forEach((tarKey) => resetField(tarKey));
    };

    if (newOptionsLength > 0) {
      resetRemovedFields(newOptionsLength);
      setNewOptionsLength((oldState) => oldState - 1);
    } else {
      resetRemovedFields(optionsState!.length);
      setOptionsState((oldState) => oldState!.slice(0, -1));
    }
  };

  const handleAddNewSideDishFields = () => {
    setNewSideDishLength((oldState) => oldState + 1);
  };

  const handleRemoveNewSideDishFields = () => {
    const formKeys = Object.keys(getValues());
    const targetArr = formKeys.filter(
      (key) =>
        key.match(`sideDish-${newSideDishLength - 1}`) ||
        key.match(`side-price-${newSideDishLength - 1}`)
    );

    targetArr.forEach((tarKey) => resetField(tarKey));
    setNewSideDishLength((oldState) => oldState - 1);
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
        defaultValues={{ title, menuType, imageUrl: fetchedImageUrl, price }}
      />

      <Divider />

      {/* Render option fields from fetched data */}
      {optionsState?.map((option, key) => (
        <OptionsField
          key={key}
          index={key}
          register={register}
          errors={errors}
          option={option}
          getValues={getValues}
          resetField={resetField}
        />
      ))}

      {/* Render new option fields */}
      {generatedOptionsArr.map((key) => (
        <OptionsField
          key={options ? options.length + key : key}
          index={options ? options.length + key : key}
          register={register}
          errors={errors}
          getValues={getValues}
          resetField={resetField}
        />
      ))}

      <FieldActions
        addLabel="+ Tùy chọn"
        onAdd={handleAddNewOptionFields}
        onRemove={handleRemoveOptionFields}
        showRemove={
          newOptionsLength > 0 ||
          (Boolean(optionsState) && optionsState!.length > 0)
        }
      />

      <Divider />

      {sideDish?.map((item, key) => (
        <SideDishField
          key={key}
          index={key}
          register={register}
          errors={errors}
          item={item}
        />
      ))}

      {!sideDish &&
        generatedSideDishArr.map((key) => (
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
