import { Box, Button, FormHelperText, Input, Stack } from "@mui/material";
import {
  FormControl,
  FormLabel,
  MultilineTextField,
  TextField,
} from "components/UI/FormComponents";
import ModalBox from "components/UI/ModalBox";
import { styled } from "shared/theme";

const FileInputButton = styled(FormLabel)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
  borderRadius: "9px",
  fontSize: "1.2rem",
  fontWeight: 400,
  color: theme.palette.primary.main,
  padding: "0.6rem 1.2rem",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

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
