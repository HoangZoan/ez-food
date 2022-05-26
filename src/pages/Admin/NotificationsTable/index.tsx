import { useState } from "react";
import {
  Button,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  TableBodyRow,
  TableCell,
  TableCellHead,
} from "components/UI/ManagingTable";
import NotificationsForm from "./NotificationsForm";

const NotificationsTable = () => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHead>Tiêu đề</TableCellHead>
            <TableCellHead align="right">
              <Button variant="outlined" onClick={handleOpenForm}>
                + Thêm
              </Button>
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

      <Dialog open={showForm} onClose={handleCloseForm} disableAutoFocus>
        <NotificationsForm onClose={handleCloseForm} />
      </Dialog>
    </>
  );
};

export default NotificationsTable;
