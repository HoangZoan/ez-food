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
    <ModalBox
      sx={{ backgroundColor: "white", px: 6, py: 5, minWidth: "54rem" }}
    >
      <Stack spacing={3}>
        <FormControl sx={{ gridTemplateColumns: "1fr 3fr" }}>
          <FormLabel>Tiêu đề:</FormLabel>
          <TextField />
        </FormControl>
        <FormControl sx={{ gridTemplateColumns: "25% max-content" }}>
          <FormLabel>Hình ảnh:</FormLabel>
          <Box>
            <FileInputButton htmlFor="photo">Tải ảnh lên</FileInputButton>
            <Input type="file" id="photo" sx={{ display: "none" }} />
            {/* <FormHelperText></FormHelperText> */}
          </Box>
        </FormControl>
        <FormControl sx={{ gridTemplateColumns: "1fr 3fr" }}>
          <FormLabel>Nội dung:</FormLabel>
          <MultilineTextField minRows={3} />
        </FormControl>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={4}
          sx={{ pt: 5 }}
        >
          <Button variant="contained">Cập nhật</Button>
          <Button variant="outlined" onClick={onClose}>
            Trở lại
          </Button>
        </Stack>
      </Stack>
    </ModalBox>
  );
};

export default NotificationsForm;
