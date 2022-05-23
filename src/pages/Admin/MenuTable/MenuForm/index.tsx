import { Divider, Stack, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { MenuType, ProductDetailType } from "shared/types";
import { convertProductFormData, createNewMenu } from "shared/utils";
import { productDetailState } from "states/productDetail";
import FieldActions from "./FieldActions";
import OptionsField from "./OptionsField";
import ProductInfoField from "./ProductInfoField";
import SideDishField from "./SideDishField";
import { firestoreService } from "../../../../firebase/firestore";
import { useSnackbar } from "states/snackbar/hooks/useSnackbar";

interface MenuFormProps {
  onClose: () => void;
  item?: ProductDetailType;
  itemType: string;
}

const MenuForm = ({ onClose, item, itemType }: MenuFormProps) => {
  const isAddingNew = !Boolean(item);
  const { options } = useRecoilValue(productDetailState);
  const [newOptionsLength, setNewOptionsLength] = useState(0);
  const [newSideDishLength, setNewSideDishLength] = useState(0);
  const generatedOptionsArr = Array.from(new Array(newOptionsLength).keys());
  const generatedSideDishArr = Array.from(new Array(newSideDishLength).keys());
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { showToast } = useSnackbar();
  const { mutate: uploadNewMenu, isLoading } = useMutation(
    (data: MenuType) => firestoreService.createDocument("menu", data),
    {
      onSuccess: () => {
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

  const handleFormSubmit = (data: { [key: string]: string }) => {
    const { title, price, menuType } = data;
    const { options, sideDish } = convertProductFormData(data);

    const output = createNewMenu({
      title,
      price,
      menuType,
      options,
      sideDish,
      itemType,
    });

    uploadNewMenu(output);
  };

  const handleAddNewOptionFields = () => {
    setNewOptionsLength((oldState) => oldState + 1);
  };

  const handleRemoveNewOptionFields = () => {
    setNewOptionsLength((oldState) => oldState - 1);
  };

  const handleAddNewSideDishFields = () => {
    setNewSideDishLength((oldState) => oldState + 1);
  };

  const handleRemoveNewSideDishFields = () => {
    setNewSideDishLength((oldState) => oldState - 1);
  };

  return (
    <Stack
      spacing={3}
      sx={{ px: 6, py: 5 }}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <ProductInfoField register={register} errors={errors} />

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
