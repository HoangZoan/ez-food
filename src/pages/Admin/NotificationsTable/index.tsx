import {
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  FormControl,
  FormLabel,
  MultilineTextField,
  TextField,
} from "components/UI/FormComponents";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";
import ModalBox from "components/UI/ModalBox";

const NotificationsTable = () => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>Tiêu đề</TableCellHead>
            <TableCellHead align="right">
              <Button variant="outlined">+ Thêm</Button>
            </TableCellHead>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableBodyRow>
            <TableCell sx={{ fontWeight: 700 }}>Tiêu đề...</TableCell>
            <TableCell>
              <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Button variant="contained">Cập nhật</Button>
                <Button variant="contained" color="success">
                  Hiện
                </Button>
                {/* <Button
                variant="contained-disabled"
              >
                Ẩn
              </Button> */}
                <Button variant="outlined" color="error">
                  Xóa
                </Button>
              </Stack>
            </TableCell>
          </TableBodyRow>
        </TableBody>
      </Table>

      <Modal open={true} disableAutoFocus>
        <ModalBox
          sx={{ backgroundColor: "white", px: 6, py: 5, minWidth: "54rem" }}
        >
          <Stack spacing={3}>
            <FormControl sx={{ gridTemplateColumns: "1fr 3fr" }}>
              <FormLabel>Tiêu đề:</FormLabel>
              <TextField />
            </FormControl>
            <FormControl sx={{ gridTemplateColumns: "1fr 3fr" }}>
              <FormLabel>Nội dung:</FormLabel>
              <MultilineTextField minRows={3} />
            </FormControl>
          </Stack>
        </ModalBox>
      </Modal>
    </>
  );
};

export default NotificationsTable;
