import { Divider, Stack, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ProductDetailType } from "shared/types";
import { productDetailState } from "states/productDetail";
import FieldActions from "./FieldActions";
import OptionsField from "./OptionsField";
import ProductInfoField from "./ProductInfoField";
import SideDishField from "./SideDishField";

interface MenuFormProps {
  onClose: () => void;
  item?: ProductDetailType;
}

const MenuForm = ({ onClose, item }: MenuFormProps) => {
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

  const handleFormSubmit = (data: any) => {
    console.log(data);
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
        generatedOptionsArr.map((key) => <OptionsField key={key} />)}

      <FieldActions
        addLabel="+ Tùy chọn"
        onAdd={handleAddNewOptionFields}
        onRemove={handleRemoveNewOptionFields}
        showRemove={newOptionsLength > 0}
      />

      <Divider />

      {/* <SideDishField /> */}
      {generatedSideDishArr.map((key) => (
        <SideDishField key={key} />
      ))}

      <FieldActions
        addLabel="+ Đồ gọi thêm"
        onAdd={handleAddNewSideDishFields}
        onRemove={handleRemoveNewSideDishFields}
        showRemove={newSideDishLength > 0}
      />

      <Stack direction="row" justifyContent="center" spacing={5} sx={{ pt: 5 }}>
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

export default MenuForm;
