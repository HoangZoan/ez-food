import { Box, Button, FormHelperText, Input, Stack } from "@mui/material";
import FileInputButton from "components/UI/FileInputButton";
import {
  FormControl,
  FormLabel,
  MultilineTextField,
  TextField,
} from "components/UI/FormComponents";
import ModalBox from "components/UI/ModalBox";

interface NotificationsFormProps {
  onClose: () => void;
}

const NotificationsForm = ({ onClose }: NotificationsFormProps) => {
  return (
    <Stack
      spacing={3}
      sx={{ backgroundColor: "white", px: 6, py: 5, minWidth: "54rem" }}
    >
      <FormControl sx={{ gridTemplateColumns: "1fr 3fr", columnGap: "2.4rem" }}>
        <FormLabel>Tiêu đề:</FormLabel>
        <TextField />
      </FormControl>
      <FormControl
        sx={{ gridTemplateColumns: "25% max-content", columnGap: "2.4rem" }}
      >
        <FormLabel>Hình ảnh:</FormLabel>
        <Box>
          <FileInputButton htmlFor="photo">Tải ảnh lên</FileInputButton>
          <Input type="file" id="photo" sx={{ display: "none" }} />
          {/* <FormHelperText></FormHelperText> */}
        </Box>
      </FormControl>
      <FormControl sx={{ gridTemplateColumns: "1fr 3fr", columnGap: "2.4rem" }}>
        <FormLabel>Nội dung:</FormLabel>
        <MultilineTextField minRows={3} />
      </FormControl>

      <Stack direction="row" justifyContent="center" spacing={4} sx={{ pt: 5 }}>
        <Button variant="contained">Cập nhật</Button>
        <Button variant="outlined" onClick={onClose}>
          Trở lại
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotificationsForm;
