import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  Button,
  Input,
} from "@mui/material";
import FileInputButton from "components/UI/FileInputButton";
import {
  FormControl,
  FormLabel,
  TextField,
} from "components/UI/FormComponents";
import { useState } from "react";
import { styled } from "shared/theme";
import { ProductDetailType } from "shared/types";

const MenuFormControl = styled(FormControl)({
  gridTemplateColumns: "1fr 3fr",
  columnGap: "3.6rem",
});

const MenuFormSelect = styled(Select)({
  minWidth: "12rem",
  "& .MuiSelect-select": {
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
  },
});

const MenuOptionLabel = styled(MuiFormLabel)({
  fontSize: "1.2rem",
  marginBottom: "0.4rem",
  fontWeight: 700,
});

interface MenuFormProps {
  onClose: () => void;
  item?: ProductDetailType;
}

const MenuForm = ({ onClose, item }: MenuFormProps) => {
  const [type, setType] = useState("single");
  const isAddingNew = !Boolean(item);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setType(event.target.value as string);
  };

  return (
    <Stack spacing={3} sx={{ px: 6, py: 5 }} component="form">
      {/* BASIC INFO */}
      <MenuFormControl>
        <FormLabel>Tên món:</FormLabel>
        <TextField />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Loại:</FormLabel>
        <Box>
          <MenuFormSelect value={type} onChange={handleChange}>
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
        <Stack direction="row" spacing={3}>
          <TextField type="number" sx={{ width: 1 / 4 }} />
          <Typography>(nghìn VNĐ)</Typography>
        </Stack>
      </MenuFormControl>

      <Divider />

      {/* OPTIONS */}
      <MenuFormControl>
        <FormLabel>Tên lựa chọn:</FormLabel>
        <TextField />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Các lựa chọn:</FormLabel>

        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={8}>
              <MuiFormControl>
                <MenuOptionLabel>Lựa chọn</MenuOptionLabel>
                <TextField />
              </MuiFormControl>
            </Grid>
            <Grid item xs={4}>
              <MuiFormControl>
                <MenuOptionLabel>Tăng thêm</MenuOptionLabel>
                <TextField type="number" placeholder="Nghìn VNĐ" disabled />
              </MuiFormControl>
            </Grid>
          </Grid>

          <Button sx={{ alignSelf: "flex-start", fontSize: "1.2rem" }}>
            + Thêm lựa chọn
          </Button>
        </Stack>
      </MenuFormControl>

      <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
        + Tùy chọn
      </Button>

      <Divider />

      {/* SIDE-DISH */}
      <MenuFormControl>
        <FormLabel>Đồ gọi thêm:</FormLabel>
        <TextField />
      </MenuFormControl>
      <MenuFormControl>
        <FormLabel>Giá:</FormLabel>

        <Stack direction="row" spacing={3}>
          <TextField type="number" sx={{ width: 1 / 4 }} />
          <Typography>(nghìn VNĐ)</Typography>
        </Stack>
      </MenuFormControl>

      <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
        + Đồ gọi thêm
      </Button>

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
